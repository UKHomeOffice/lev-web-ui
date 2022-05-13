'use strict';

const { api } = require('../config');

class HeaderUtils {

  /**
   * Populate headers for the rest api from the current authenticated user
   *
   * @param req
   * @returns {{"X-Auth-Username": *, "X-Auth-Aud"}}
   */
  static getHeaders(req) {
    const token = req.headers['X-Auth-Token'];
    const roles = req.headers['X-Auth-Roles'];

    let headers = {
      'X-Auth-Aud': api.client,
      'X-Auth-Username': api.username
    };

    if (token) {
      headers = {
        ...headers,
        'Authorization': `Bearer ${token}`
      };
    } else if (roles) {
      headers = {
        ...headers,
        'X-Auth-Roles': roles
      };
    }

    return headers;
  }
}

module.exports = HeaderUtils;
