const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');

class OrganisationController extends BaseController {
  async getValues(req, _res, next) {
    try {
      const searchResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.id}`
      });
      let teamResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.id}/teams`
      });

      teamResults.sort((t1, t2) => {
        const team1 = t1.name.toLowerCase();
        const team2 = t2.name.toLowerCase();
        if (team1 > team2) { return 1; }
        if (team1 < team2) { return -1; }
        return 0;
      });
      
      req.sessionModel.set('orgResults', searchResults);
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
      locals.orgInfo = req.sessionModel.get('orgResults') || [];
      locals.teams = req.sessionModel.get('teamResults') || [];
      callback(null, locals);
    });
  }
}

module.exports = OrganisationController;
