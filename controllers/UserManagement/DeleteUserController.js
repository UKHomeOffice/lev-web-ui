const BaseController = require('../BaseController');
const { userDelete } = require('../../services/UserManagement/UserActionsService');

class DeleteUserController extends BaseController {
    async saveValues(req, res, next) {
      try {
        await userDelete({
          ...this.getOptions(req),
          url: `/admin/organisations/${req.params.orgId}/user/${req.params.username}`
        });

      req.sessionModel.set('deletedUser', req.params.username);

      res.redirect(`/admin/organisations/${req.params.orgId}/team/${req.params.teamId}`);
    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }
}

module.exports = DeleteUserController;
