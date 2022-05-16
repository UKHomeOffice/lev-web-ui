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
}

module.exports = BaseController;
