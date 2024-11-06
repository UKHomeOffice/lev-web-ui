const BaseController = require('../BaseController');
const teamPermissionsObjectBuilder = require('../../helpers/teamPermissionsObjectBuilder')
const { postRequest } = require('../../services/UserManagement/UserActionsService');

class TeamCreateController extends BaseController {

  async saveValues(req, res, next) {
    const teamName = req.body.teamName;
    try {
      const teamPermissions= teamPermissionsObjectBuilder(req.body.permissionCheckboxes, next);

      await postRequest( {
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams`,
      }, { teamName: teamName, teamPermissions: teamPermissions });
      req.sessionModel.set('addTeamAttempt', true);
      req.sessionModel.set('addTeamSuccess', true);
    } catch (err) {
      req.sessionModel.set('addTeamSuccess', false);
      if (err.status === 409) {
        req.sessionModel.set('addTeamAttempt', true);
        req.sessionModel.set('teamExistsError', true);
      }
      next(err);
    }
    req.sessionModel.set('addedTeamName', teamName);
    res.redirect(`/admin/organisations/${req.params.orgId}`);
  }
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      callback(null, locals);
    });
  }
}

module.exports = TeamCreateController;