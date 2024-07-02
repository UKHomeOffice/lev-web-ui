const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');


class TeamController extends BaseController {
  async getValues(req, _res, next) {
    try {
      const teamResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}`
      });

      req.sessionModel.set('teamResults', teamResults);
      next();
    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.teamInfo = req.sessionModel.get('teamResults') || {};
      callback(null, locals);
    });
  }
}

module.exports = TeamController;
