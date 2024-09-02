const BaseController = require('../BaseController');
const { deleteRequest } = require('../../services/UserManagement/UserActionsService');

class DeleteUserController extends BaseController {
    async saveValues(req, res, next) {
      try {
        await deleteRequest({
          ...this.getOptions(req),
          url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}/users/${req.params.username}`
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
