const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');
const queryParamsBuilder = require("../../helpers/queryParamsBuilder");

class OrganisationController extends BaseController {
  async getValues(req, _res, next) {
    try {
      const searchResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}`,
      });
      const teamResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams`
      });

      const userResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/users${queryParamsBuilder(req)}`
      });

      req.sessionModel.set('orgResults', searchResults);
      req.sessionModel.set('teamResults', teamResults);
      req.sessionModel.set('userResults', userResults.users);
      req.sessionModel.set('usersMetaData', userResults.metadata);

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
      locals.users = req.sessionModel.get('userResults') || [];
      locals.usersMetaData = req.sessionModel.get('usersMetaData') || { total: 0, currentPage: 1, perPage: 20};
      locals.addTeamAttempt = req.sessionModel.get('addTeamAttempt') || false;
      locals.addTeamSuccess = req.sessionModel.get('addTeamSuccess') || false;
      locals.addedTeamName = req.sessionModel.get('addedTeamName') || '';
      locals.teamExistsError = req.sessionModel.get('teamExistsError') || false;
      locals.IS_EXTERNAL = process.env.IS_EXTERNAL || 'false';

      req.sessionModel.unset('addTeamAttempt');
      req.sessionModel.unset('addTeamSuccess');
      req.sessionModel.unset('addedTeamName');
      req.sessionModel.unset('teamExistsError');
      callback(null, locals);
    });
  }
}

module.exports = OrganisationController;
