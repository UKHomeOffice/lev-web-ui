const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');

class OrganisationsController extends BaseController {
  async getValues(req, _res, next) {
    try {
      const orgsResult = await orgLookup({
        ...this.getOptions(req),
        url: '/admin/organisations'
      });

      const orgs = orgsResult.organisations;

      if (orgs.length == 1) {
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
      callback(null, locals);
    });
  }
}

module.exports = OrganisationsController;