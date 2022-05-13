'use strict';

const { Controller } = require('hmpo-form-wizard');
const {api} = require('../config');

class BaseController extends Controller {

  getOptions(req) {
    let options = {
      headers: {
        'X-Auth-Aud': api.client,
        'X-Auth-Username': api.username
      }
    };

    if (api.protocol === 'https') {
      options = {
        ...options,
        rejectUnauthorized: api.rejectUnauthorized
      };

      const token = req.headers['x-auth-token'];
      const roles = req.headers['x-auth-roles'];

      if (token) {
        options = {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
          }
        };
      } else if (roles) {
        options = {
          ...options,
          headers: {
            ...options.headers,
            'X-Auth-Roles': roles
          }
        };
      }
    }

    return options;
  }
}

module.exports = BaseController;
