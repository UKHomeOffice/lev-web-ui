const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');

class UserController extends BaseController {

  async getValues(req, _res, next) {
    try {
      const userResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}/users/${req.params.username}`
      });

      req.sessionModel.set('userResults', userResults);

      next();
    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.userInfo = req.sessionModel.get('userResults') || [];
      locals.updatingUser = req.sessionModel.get('updatingUser') || false;
      locals.updatedUser = req.sessionModel.get('updatedUser') || false;
      req.sessionModel.unset('updatingUser');
      req.sessionModel.unset('updatedUser');
      callback(null, locals);
    });
  }
}

module.exports = UserController;
