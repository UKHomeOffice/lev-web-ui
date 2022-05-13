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

    if (api.port === 'https') {
      options = {
        ...options,
        https: {
          rejectUnauthorized: api.rejectUnauthorized
        }
      };

      const token = req.headers['X-Auth-Token'];
      const roles = req.headers['X-Auth-Roles'];

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
