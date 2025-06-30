const BaseController = require('../BaseController');
const { getRequest } = require('../../services/UserManagement/IamApiService');
const filterUIMapperByPermissions = require("../../lib/filterUIMapperByPermissions");
const fullDatasetFieldMapper = require("../../lib/FullDatasetFieldMapper");
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");

class ViewOrganisationAuthorisedDataController extends BaseController {
  async getValues(req, _res, next) {

    try {
      this.validateGetRequest(req, _res, next);

      const searchResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}`,
      });

      req.sessionModel.set('orgResults', searchResults);

      const fields = filterUIMapperByPermissions(searchResults.flsSchema, fullDatasetFieldMapper)

      req.sessionModel.set('fields', fields);

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
      locals.fields = req.sessionModel.get('fields') || {};
      locals.backLink = '/admin/organisations';
      locals.IS_EXTERNAL = process.env.IS_EXTERNAL || 'true';

      callback(null, locals);
    });
  }
}

module.exports = ViewOrganisationAuthorisedDataController;
