const BaseController = require('../BaseController');
const { getRequest, postRequest } = require('../../services/UserManagement/IamApiService');
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");

class OrganisationUpdateEmailDomain extends BaseController {

  async getValues(req, res, next) {
    try {
      const orgInfo = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}`
      });
      req.sessionModel.set('orgInfo', orgInfo);
      req.sessionModel.set('emailDomainToDelete', req.params.emailDomainToDelete);
      next();

    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  async saveValues(req, res, next) {

    const emailDomains = req.form.values['emailDomains'];
    const operation = req.body.operation;
    const payload = req.body.operation === 'add' ? { add: emailDomains } : { delete: [req.params.emailDomainToDelete] };

    try {
      await postRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}`,
      }, { organisationName: req.sessionModel.get('orgInfo').name, orgEmailDomainUpdate: payload });
    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }

    if (operation === 'add') {
      req.sessionModel.set('addedDomains', payload.add);
    }
    else {
      req.sessionModel.set('deletedDomain', payload.delete);
    }

    req.sessionModel.set('updateDomainsAttempt', true);
    res.redirect(`/admin/organisations/${req.params.orgId}/manage`);
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.orgInfo = req.sessionModel.get('orgInfo');
      locals.pageName = req.url.includes('add') ? 'addEmailDomainPage' : 'deleteEmailDomainPage';
      locals.emailDomainToDelete = req.sessionModel.get('emailDomainToDelete');
      locals.backLink = '/admin/organisations/'+ locals.orgInfo.id + (req.url.includes('domain') ? '/manage' : '');
      callback(null, locals);
    });
  }
}

module.exports = OrganisationUpdateEmailDomain;