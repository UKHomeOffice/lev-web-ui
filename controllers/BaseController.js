'use strict';

const { Controller } = require('hmpo-form-wizard');
const {api} = require('../config');

class BaseController extends Controller {

  getOptions(req) {
    let options = {
      headers: {
        'x-auth-aud': api.client,
        'x-auth-username': api.username
      }
    };

    if (api.protocol === 'https') {
      options = {
        ...options,
        headers: {
          ...options.headers,
          'x-auth-aud': req.headers['x-auth-aud'],
          'x-auth-username': req.headers['x-auth-username']
        },
        https: {
          rejectUnauthorized: api.rejectUnauthorized
        }
      };

      const token = req.headers['x-auth-token'];
      const roles = req.headers['x-auth-roles'];

      if (token) {
        options = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`
          }
        };
      } else if (roles) {
        options = {
          ...options,
          headers: {
            ...options.headers,
            'x-auth-roles': roles
          }
        };
      }
    }

    return options;
  }
}

module.exports = BaseController;
