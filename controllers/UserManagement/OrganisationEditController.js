const BaseController = require('../BaseController');
const { getRequest, postRequest } = require('../../services/UserManagement/IamApiService');
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");

class OrganisationEditController extends BaseController {

  async getValues(req, res, next) {
    try {
      const orgInfo = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}`
      });

      req.sessionModel.set('orgInfo', orgInfo);
      next();

    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  async process(req, res, next) {
    // using it for pre-populating fields and remain the organisation name values on the error screen
    req.sessionModel.set('organisationNameFromForm', req.form.values['organisationName']);

    next();
  }

  async saveValues(req, res) {

    // Get the values from the form
    const organisationName = req.form.values['organisationName'];

    try {
      req.sessionModel.set('editOrgAttempt', true);

      await postRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}`,
      }, { organisationName: organisationName });

      req.sessionModel.set('editOrgSuccess', true);

    } catch (err) {
      req.sessionModel.set('editOrgSuccess', false);
      if (err.status === 409) {
        req.sessionModel.set('orgExistsError', true);
      }
    }

    req.sessionModel.set('updatedOrgName', organisationName);
    req.sessionModel.unset('organisationNameFromForm');
    res.redirect(`/admin/organisations/${req.params.orgId}`);
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.pageName = 'organisationEditPage';
      locals.orgInfo = req.sessionModel.get('orgInfo');
      locals.values = { organisationName: locals.orgInfo.name };
      locals.backLink = '/admin/organisations/'+locals.orgInfo.id;

      const organisationNameFromPreviousSubmittedForm = req.sessionModel.get('organisationNameFromForm');

      if (organisationNameFromPreviousSubmittedForm || organisationNameFromPreviousSubmittedForm === '') {
        locals.values.organisationName = organisationNameFromPreviousSubmittedForm;
        req.sessionModel.unset('organisationNameFromForm');
      }

      callback(null, locals);
    });
  }
}

module.exports = OrganisationEditController;