const BaseController = require('../BaseController');
const { permissionsArrayToObject, permissionsObjectToArray } = require('../../helpers/teamPermissionsObjectBuilder')
const { postRequest } = require('../../services/UserManagement/UserActionsService');
const { orgLookup } = require("../../services/UserManagement/OrganisationSearchService");

class TeamEditController extends BaseController {

  async getValues(req, res, next) {
    try {
      const teamInfo = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}`
      });

      req.sessionModel.set('teamInfo', teamInfo);
      next();

    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  async saveValues(req, res, next) {
    const teamName = req.body.teamName;
    console.log(req.body)
    try {
      const teamPermissions= permissionsArrayToObject(req.body.permissionCheckboxes, next);

      await postRequest( {
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}`,
      }, { teamName: teamName, teamPermissions: teamPermissions });
      req.sessionModel.set('editTeamAttempt', true);
      req.sessionModel.set('editTeamSuccess', true);
    } catch (err) {
      req.sessionModel.set('editTeamSuccess', false);
      if (err.status === 409) {
        req.sessionModel.set('editTeamAttempt', true);
      }
      next(err);
    }
    req.sessionModel.set('updatedTeamName', teamName);
    res.redirect(`/admin/organisations/${req.params.orgId}`);
  }
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      const {teamName, permissions} = req.sessionModel.get("teamInfo")
      const permissionsArray = permissionsObjectToArray(permissions)

      locals.pageName = "editTeamPage";
      locals.values = { teamName: teamName, permissionCheckboxes: permissionsArray }
      if (error) return callback(error);
      callback(null, locals);
    });
  }
}

module.exports = TeamEditController;