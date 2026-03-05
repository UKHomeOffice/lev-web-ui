'use strict';

const BaseController = require('./BaseController');

class PreLogoutController extends BaseController {
  async getValues(req, _res) {

    if (req.query.sessionTimeout == 'true') {
      req.session.sessionTimeout = true;
    }
    _res.redirect('/oauth/logout');
  }
}

module.exports = PreLogoutController;
