const BaseController = require('../BaseController');
const { getRequest } = require('../../services/UserManagement/IamApiService');
const queryParamsBuilder = require("../../helpers/queryParamsBuilder");
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");
const { formatLastActive } = require('../../helpers/lastActiveFormatter');

class OrganisationController extends BaseController {
  async getValues(req, _res, next) {

    try {
      this.validateGetRequest(req, _res, next);

      const searchResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}`,
      });
      const teamResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}/teams`
      });

      const userResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}/users${queryParamsBuilder(req)}`
      });
      
      const userResultsFormatted = formatLastActive(userResults.users);

      req.sessionModel.set('orgResults', searchResults);
      req.sessionModel.set('teamResults', teamResults);
      req.sessionModel.set('userResults', userResultsFormatted);
      req.sessionModel.set('usersMetaData', userResults.metadata);
      req.sessionModel.set('userSearchParam', req.query.searchTerm);

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
      locals.editTeamAttempt = req.sessionModel.get('editTeamAttempt') || false;
      locals.editTeamSuccess = req.sessionModel.get('editTeamSuccess') || false;
      locals.editedTeamExists = req.sessionModel.get('editedTeamExists') || false;
      locals.updatedTeamName = req.sessionModel.get('updatedTeamName') || '';
      locals.addedTeamName = req.sessionModel.get('addedTeamName') || '';
      locals.teamExistsError = req.sessionModel.get('teamExistsError') || false;
      locals.editOrgAttempt = req.sessionModel.get('editOrgAttempt') || false;
      locals.editOrgSuccess = req.sessionModel.get('editOrgSuccess') || false;
      locals.orgExistsError = req.sessionModel.get('orgExistsError') || false;
      locals.updatedOrgName = req.sessionModel.get('updatedOrgName') || '';
      locals.userSearchParam = req.sessionModel.get('userSearchParam') || null;
      locals.IS_EXTERNAL = process.env.IS_EXTERNAL || 'true';

      req.sessionModel.unset('addTeamAttempt');
      req.sessionModel.unset('addTeamSuccess');
      req.sessionModel.unset('addedTeamName');
      req.sessionModel.unset('editTeamAttempt');
      req.sessionModel.unset('editTeamSuccess');
      req.sessionModel.unset('teamExistsError');
      req.sessionModel.unset('editedTeamExists');
      req.sessionModel.unset('editOrgAttempt');
      req.sessionModel.unset('editOrgSuccess');
      req.sessionModel.unset('orgExistsError');
      req.sessionModel.unset('updatedOrgName');
      callback(null, locals);
    });
  }
}

module.exports = OrganisationController;
