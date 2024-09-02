const BaseController = require('../BaseController');
const { postRequest } = require('../../services/UserManagement/UserActionsService');

class ResetUserPasswordController extends BaseController {
  async saveValues(req, res) {
    try {
      req.sessionModel.set('passwordResetAttempted', true);
      await postRequest({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}/users/${req.params.username}/reset-password`
      });
      req.sessionModel.set('passwordResetSuccess', true);
    } catch (err) {
      req.sessionModel.set('passwordResetSuccess', false);
    }
    res.redirect(`/admin/organisations/${req.params.orgId}/team/${req.params.teamId}/user/${req.params.username}`);
  }
}

module.exports = ResetUserPasswordController;
