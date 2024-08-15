const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');
const { userEdit } = require('../../services/UserManagement/UserActionsService');
class UserEditController extends BaseController {

  async getValues(req, _res, next) {

    try {
      const userResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}/users/${req.params.username}`
      });

      const orgTeamsResult = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams`
      });

      req.sessionModel.set('userResults', userResults);
      req.sessionModel.set('orgTeamsResult', orgTeamsResult);

      next();

    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  async saveValues(req, _res, next) {

    // Get the values from the edit form
    const firstname = req.form.values['firstname'];
    const lastname = req.form.values['lastname'];
    const updatedTeamId = req.form.values['teamSelect'];

    try {
      await userEdit( {
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}/users/${req.params.username}`,
      }, { firstname: firstname, lastname: lastname, teamId: updatedTeamId });

      req.sessionModel.set('updatedUser', req.params.username);
      _res.redirect(`/admin/organisations/${req.params.orgId}/team/${updatedTeamId}/user/${req.params.username}`);
    } catch (err) {
      next(err);
    }
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.userInfo = req.sessionModel.get('userResults') || [];
      locals.orgTeams = req.sessionModel.get('orgTeamsResult') || [];
      callback(null, locals);
    });
  }
}

module.exports = UserEditController;