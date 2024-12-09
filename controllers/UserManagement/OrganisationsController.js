const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");

class OrganisationsController extends BaseController {
  async getValues(req, _res, next) {
    try {
      const orgsResult = await orgLookup({
        ...requestOptions(req, iamApi),
        url: '/admin/organisations'
      });

      const orgs = orgsResult.organisations;

      if (orgs.length === 1) {
        return _res.redirect(`/admin/organisations/${orgs[0].id}`);
      }

      req.sessionModel.set('orgsResult', orgs);
      next();

    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.orgsInfo = req.sessionModel.get('orgsResult') || [];
      locals.IS_EXTERNAL = process.env.IS_EXTERNAL || 'true';
      locals.addOrgAttempt = req.sessionModel.get('addOrgAttempt') || false;
      locals.addOrgSuccess = req.sessionModel.get('addOrgSuccess') || false;
      locals.addedOrgName = req.sessionModel.get('addedOrgName') || '';
      locals.orgExistsError = req.sessionModel.get('orgExistsError') || false;
      req.sessionModel.unset('addOrgAttempt');
      req.sessionModel.unset('addOrgSuccess');
      req.sessionModel.unset('addedOrgName');
      req.sessionModel.unset('orgExistsError');
      callback(null, locals);
    });
  }
}

module.exports = OrganisationsController;
