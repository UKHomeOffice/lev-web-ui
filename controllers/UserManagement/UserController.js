const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");

class UserController extends BaseController {

  async getValues(req, _res, next) {
    try {
      const userResults = await orgLookup({
        ...requestOptions(req, iamApi),
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
      locals.passwordResetAttempted = req.sessionModel.get('passwordResetAttempted') || false;
      locals.passwordResetSuccess = req.sessionModel.get('passwordResetSuccess') || false;
      locals.updatingUser = req.sessionModel.get('updatingUser') || false;
      locals.updatedUser = req.sessionModel.get('updatedUser') || false;
      req.sessionModel.unset('passwordResetAttempted');
      req.sessionModel.unset('passwordResetSuccess');
      req.sessionModel.unset('updatingUser');
      req.sessionModel.unset('updatedUser');
      callback(null, locals);
    });
  }
}

module.exports = UserController;
