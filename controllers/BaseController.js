'use strict';

const { Controller } = require('hmpo-form-wizard');
const { api } = require('../config');

class BaseController extends Controller {

  getOptions(req) {
    let options = {
      headers: {
        'x-auth-aud': api.client,
        'x-auth-username': api.username
      }
    };

    if (api.protocol === 'https') {
      const token = req.headers['x-auth-token'];
      const roles = req.headers['x-auth-roles'];

      options = {
        ...options,
        headers: {
          ...options.headers,
          ...(token && { Authorization: `Bearer ${token}`}),
          ...(!token && roles && { 'x-auth-roles': roles })
        },
        https: {
          rejectUnauthorized: api.rejectUnauthorized
        }
      };
    }

    return options;
  }

  pageNotFound() {
    const err = new Error('Page not found');
    err.code = 'PAGE_NOT_FOUND';
    err.template = 'errors/page-not-found';
    err.status = 404;

    return err;
  }
}

module.exports = BaseController;
