const BaseController = require('../BaseController');
const { optimiseForUserManagementRender } = require('../../helpers/FlsSchemaHelpers');
const fullDatasetFieldMapper = require("../../lib/FullDatasetFieldMapper");
const { flsSchemaCache } = require("../../helpers/flsSchemaCache");

class ViewOrganisationAuthorisedDataController extends BaseController {
  async getValues(req, _res, next) {

    try {

      const flsPayload = (await flsSchemaCache(req));
      const fields = optimiseForUserManagementRender(fullDatasetFieldMapper, flsPayload?.flsSchema);

      req.sessionModel.set('orgResults', flsPayload?.orgInfo);
      req.sessionModel.set('fields', fields);

      next();
    } catch (err) {
      console.log(err)
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
      locals.changeAuthorisedDataAttempt = req.sessionModel.get('changeAuthorisedDataAttempt');
      locals.changeAuthorisedDataSuccess = req.sessionModel.get('changeAuthorisedDataSuccess');
      locals.IS_EXTERNAL = process.env.IS_EXTERNAL || 'true';

      req.sessionModel.unset('changeAuthorisedDataAttempt');
      req.sessionModel.unset('changeAuthorisedDataSuccess');

      callback(null, locals);
    });
  }
}

module.exports = ViewOrganisationAuthorisedDataController;
