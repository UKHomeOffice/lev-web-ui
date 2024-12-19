const BaseController = require('../BaseController');
const { permissionsArrayToObject } = require('../../helpers/teamPermissionsObjectBuilder')
const { postRequest } = require('../../services/UserManagement/IamApiService');
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");

class TeamCreateController extends BaseController {

  async saveValues(req, res, next) {
    const teamName = req.body.teamName;
    try {
      const teamPermissions= permissionsArrayToObject(req.body.permissionCheckboxes, next);
      req.sessionModel.set('addTeamAttempt', true);

      await postRequest( {
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}/teams`,
      }, { teamName: teamName, teamPermissions: teamPermissions });
      req.sessionModel.set('addTeamSuccess', true);
    } catch (err) {
      req.sessionModel.set('addTeamSuccess', false);
      if (err.status === 409) {
        req.sessionModel.set('teamExistsError', true);
      }
      next(err);
    }
    req.sessionModel.set('addedTeamName', teamName);
    res.redirect(`/admin/organisations/${req.params.orgId}`);
  }
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      locals.pageName = "addTeamPage";
      if (error) return callback(error);
      callback(null, locals);
    });
  }
}

module.exports = TeamCreateController;