const BaseController = require('../BaseController');
const { getRequest } = require('../../services/UserManagement/IamApiService');
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");

class OrganisationController extends BaseController {
  async getValues(req, _res, next) {

    try {
      this.validateGetRequest(req, _res, next);

      const searchResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}`,
      });

      req.sessionModel.set('orgResults', searchResults);

      next();
    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.orgInfo = req.sessionModel.get('orgResults') || [];
      locals.addedDomains = req.sessionModel.get('addedDomains') || [];
      locals.deletedDomain = req.sessionModel.get('deletedDomain') || '';
      locals.updateDomainsAttempt = req.sessionModel.get('updateDomainsAttempt') || '';
      locals.backLink = '/admin/organisations';
      locals.IS_EXTERNAL = process.env.IS_EXTERNAL || 'true';

      req.sessionModel.unset('addedDomains');
      req.sessionModel.unset('deletedDomain');
      req.sessionModel.unset('updateDomainsAttempt');
      callback(null, locals);
    });
  }
}

module.exports = OrganisationController;
