'use strict';

const BaseController = require('./BaseController');

class HomeController extends BaseController {

  async getValues(req, _res, next) {

    const birth = this.hasRole(req, 'birth') || false;
    const death = this.hasRole(req, 'death') || false;
    const marriage = this.hasRole(req, 'marriage') || false;
    const partnership = this.hasRole(req, 'partnership') || false;
    const manageOrg = this.hasRole(req, 'user-management') || false;

    if (!birth && !death && !marriage && !partnership && !manageOrg) {
      _res.redirect('/outh/logout');
    }

    req.sessionModel.set('birth', birth);
    req.sessionModel.set('death', death);
    req.sessionModel.set('marriage', marriage);
    req.sessionModel.set('partnership', partnership);
    req.sessionModel.set('manageOrganisation', manageOrg);
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
      locals.isExternal = process.env.IS_EXTERNAL;
      locals.externalURL = process.env.EXTERNAL_URL;

      callback(null, locals);
    });
  }
}

module.exports = HomeController;