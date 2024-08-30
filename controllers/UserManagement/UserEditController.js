const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');
const { userEdit } = require('../../services/UserManagement/UserActionsService');
const {request} = require("express");
class UserEditController extends BaseController {

  async getValues(req, res, next) {

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

  async process(req, res, next) {
    // using it for pre-populating fields and remain the user edited values on the error screen
    req.sessionModel.set('username', req.params.username);
    req.sessionModel.set('firstNameFromForm', req.form.values['firstName']);
    req.sessionModel.set('lastNameFromForm', req.form.values['lastName']);

    next();
  }

  async saveValues(req, res) {

    // Get the values from the edit form
    const firstname = req.form.values['firstName'];
    const lastname = req.form.values['lastName'];
    const updatedTeamId = req.form.values['teamSelect'];

    try {
      req.sessionModel.set('updatingUser', true);
      await userEdit( {
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}/users/${req.params.username}`,
      }, { firstname: firstname, lastname: lastname, teamId: updatedTeamId });

      req.sessionModel.set('updatedUser', req.params.username);
    } catch (err) {
      req.sessionModel.set('updatedUser', false);
    }
    res.redirect(`/admin/organisations/${req.params.orgId}/team/${updatedTeamId}/user/${req.params.username}`);
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.userInfo = req.sessionModel.get('userResults') || [];
      locals.orgTeams = req.sessionModel.get('orgTeamsResult') || [];
      locals.values = { firstName: locals.userInfo.firstName, lastName: locals.userInfo.lastName };

      const firstNameFromPreviousSubmittedForm = req.sessionModel.get('firstNameFromForm');
      const lastNameFromPreviousSubmittedForm = req.sessionModel.get('lastNameFromForm');

      if (req.sessionModel.get('username') === locals.userInfo.username) {
        if (firstNameFromPreviousSubmittedForm || firstNameFromPreviousSubmittedForm === '') {
          locals.values.firstName = firstNameFromPreviousSubmittedForm;
          req.sessionModel.unset('firstNameFromForm');
        }
        if (lastNameFromPreviousSubmittedForm || lastNameFromPreviousSubmittedForm === '') {
          locals.values.lastName = lastNameFromPreviousSubmittedForm;
          req.sessionModel.unset('lastNameFromForm');
        }
        req.sessionModel.unset('username');
      }
      callback(null, locals);
    });
  }
}

module.exports = UserEditController;