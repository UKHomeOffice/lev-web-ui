'use strict';

const BaseController = require('./BaseController');

class HomeController extends BaseController {

  async getValues(req, _res, next) {
    // get roles from token

    req.sessionModel.set('birth', true);
    req.sessionModel.set('death', true);
    req.sessionModel.set('marriage', true);
    req.sessionModel.set('partnership', true);
    req.sessionModel.set('manageOrganisation', true);
    next();
  }
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      locals.birth = req.sessionModel.get('birth') || false;
      locals.death = req.sessionModel.get('death') || false;
      locals.marriage = req.sessionModel.get('marriage') || false;
      locals.partnership = req.sessionModel.get('partnership') || false;
      locals.manageOrganisation = req.sessionModel.get('manageOrganisation') || false;
      
      callback(null, locals);
    });
  }
}

module.exports = HomeController;