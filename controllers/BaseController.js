'use strict';

const { Controller } = require('hmpo-form-wizard');
const getCurrentUser = require("../helpers/getCurrentUser");

class BaseController extends Controller {

  pageNotFound() {
    const err = new Error('Page not found');
    err.code = 'PAGE_NOT_FOUND';
    err.template = 'errors/page-not-found';
    err.status = 404;

    return err;
  }

  hasRole(req, role) {
    const roles = req.headers['x-auth-roles'] || process.env.ROLES;

    return roles && roles.includes(role);
  }

  getGroups(req) {
    const groups = req.headers['x-auth-groups'];

    return groups ? groups.split(',') : [];
  }

  validateGetRequest(req, res, next) {
    if (req.method === 'GET') {
      let queryErrors = this.validateUserSearchTermQueryParam(req);

      if (Object.keys(queryErrors).length > 0) {
        req.form.errors = queryErrors;
        return next();
      }
    }
  }

  validateUserSearchTermQueryParam(req) {
    let errors = {};
    let queryParams = req.query;

    const searchTermRegex = /^[a-zA-Z0-9-'@.]{3,128}$/;

    const searchTermRegexCheck = searchTermRegex.test(queryParams.searchTerm);

    if (queryParams.searchTerm && !searchTermRegexCheck) {
      errors.userName = {
        // placeholder message
        message: 'Searches should be between 3 and 128 characters and can only include letters, numbers, hyphens, ampersands and apostrophes',
      };
    }
    return errors;
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.username = getCurrentUser(req);

      callback(null, locals);
    });
  }
}

module.exports = BaseController;
