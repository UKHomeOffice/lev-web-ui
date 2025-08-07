const BaseController = require('../BaseController');
const { postRequest } = require('../../services/UserManagement/IamApiService');
const { optimiseForUserManagementRender } = require('../../helpers/FlsSchemaHelpers');
const fullDatasetFieldMapper = require("../../lib/FullDatasetFieldMapper");
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");
const { flsSchemaCache } = require("../../helpers/flsSchemaCache");
const redisService = require("../../lib/redisCacheService");
const { expandAndCombineSchemas } = require("../../helpers/updateSchema");

class ChangeOrganisationAuthorisedDataController extends BaseController {
  async getValues(req, _res, next) {
    try {

      const flsPayload = (await flsSchemaCache(req));
      const fields = optimiseForUserManagementRender(fullDatasetFieldMapper, flsPayload.flsSchema)[req.params.dataset][req.params.sectionKey];

      req.sessionModel.set('orgInfo', flsPayload.orgInfo);
      req.sessionModel.set('fields', fields);
      req.sessionModel.set('dataset', (req.params.dataset === "birthV1" || req.params.dataset === "birthV0") ? "birth" : req.params.dataset );

      next();
    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  validate(req, res, next) {
    const body = req.body;
    const errors = {};

    if (body.ui && body.api) {
      Object.keys(body.ui).forEach(fieldKey => {
        const uiValue = body.ui[fieldKey];
        const apiValue = body.api[fieldKey];

        if (uiValue === 'true' && apiValue === 'false') {
          errors[fieldKey] = {
            message: `API must also be allowed.`
          };
        }
      });
    }

    if (Object.keys(errors).length > 0) {
      req.sessionModel.set('errors', errors);
      return res.redirect(`/admin/organisations/${req.params.orgId}/manage/change-authorised-data/${req.params.dataset}/${req.params.sectionKey}`)
    }
    next();
  }

  async saveValues(req, res, next) {

    try {

      const combinedResults = expandAndCombineSchemas(req.body.ui, req.body.api);
      const flsPayload = (await flsSchemaCache(req));

      await postRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}`,
      }, { organisationName: flsPayload.orgInfo.name, flsSchemaUpdate: { [req.params.dataset]: combinedResults }});

      req.sessionModel.set('changeAuthorisedDataAttempt', true);

    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }

    await redisService.del(`flsSchema:${req.params.orgId}`);
    req.sessionModel.set('changeAuthorisedDataSuccess', true);

    res.redirect(`/admin/organisations/${req.params.orgId}/manage/view-authorised-data#${req.params.dataset}`);

  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.orgInfo = req.sessionModel.get('orgInfo') || [];
      locals.fields = req.sessionModel.get('fields') || {};
      locals.dataset = req.sessionModel.get('dataset') || "";
      locals.errors = req.sessionModel.get('errors') || null;

      locals.backLink = `/admin/organisations/${locals.orgInfo.id}/manage/view-authorised-data`;
      locals.IS_EXTERNAL = process.env.IS_EXTERNAL || 'true';

      req.sessionModel.unset('errors');

      callback(null, locals);
    });
  }
}

module.exports = ChangeOrganisationAuthorisedDataController;
