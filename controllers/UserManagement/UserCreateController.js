const BaseController = require('../BaseController');
const {orgLookup} = require('../../services/UserManagement/OrganisationSearchService');
const { postRequest } = require('../../services/UserManagement/UserActionsService');
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");

class UserCreateController extends BaseController {

  async getValues(req, res, next) {

    try {
      const orgTeamsResult = await orgLookup({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}/assignable-teams`
      });

      req.sessionModel.set('orgTeamsToSelect', orgTeamsResult);
      req.sessionModel.set('orgId', req.params.orgId);
      if (req.query['currentTeamId']) {
        req.sessionModel.set('currentTeamId', req.query['currentTeamId']);
      }

      next();

    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  async process(req, res, next) {
    // using it for pre-populating fields and remain the user entered values on the error screen
    req.sessionModel.set('firstNameUserEntered', req.form.values['firstName']);
    req.sessionModel.set('lastNameUserEntered', req.form.values['lastName']);
    req.sessionModel.set('emailUserEntered', req.form.values['email']);
    req.sessionModel.set('teamIdUserSelected', req.form.values['teamSelect']);

    next();
  }

  async saveValues(req, res) {

    // Get the values from the edit form
    const firstname = req.form.values['firstName'];
    const lastname = req.form.values['lastName'];
    const email = req.form.values['email'];
    const teamIdToAdd = req.form.values['teamSelect'];

    try {
      req.sessionModel.set('addedUser', true);
      await postRequest( {
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}/users`,
      }, { firstname: firstname, lastname: lastname, email: email, teamId: teamIdToAdd });

      req.sessionModel.set('userFullName', firstname + ' ' + lastname);

    } catch (err) {
      req.sessionModel.set('userFullName', '');
      req.sessionModel.set('errorMessage', 'Sorry, there is a problem with the service. Try again later.');

      if (err.status === 409) {
        req.sessionModel.set('errorMessage', 'Sorry, there is a problem. The user already exists');
      }

    }

    req.sessionModel.unset('firstNameUserEntered');
    req.sessionModel.unset('lastNameUserEntered');
    req.sessionModel.unset('emailUserEntered');
    req.sessionModel.unset('teamIdUserSelected');
    res.redirect(`/admin/organisations/${req.params.orgId}/team/${teamIdToAdd}`);
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.orgTeams = req.sessionModel.get('orgTeamsToSelect') || [];
      locals.orgId = req.sessionModel.get('orgId') || '';
      locals.currentTeamId = req.sessionModel.get('currentTeamId') || '';
      req.sessionModel.unset('currentTeamId');

      locals.values = { firstName: '', lastName: '', email: '', teamSelect: '' };

      const firstNameFromPreviousSubmittedForm = req.sessionModel.get('firstNameUserEntered');
      const lastNameFromPreviousSubmittedForm = req.sessionModel.get('lastNameUserEntered');
      const emailFromPreviousSubmittedForm = req.sessionModel.get('emailUserEntered');
      const teamFromPreviousSubmittedForm = req.sessionModel.get('teamIdUserSelected');

      if (firstNameFromPreviousSubmittedForm || firstNameFromPreviousSubmittedForm === '') {
        locals.values.firstName = firstNameFromPreviousSubmittedForm;
        req.sessionModel.unset('firstNameUserEntered');
      }
      if (lastNameFromPreviousSubmittedForm || lastNameFromPreviousSubmittedForm === '') {
        locals.values.lastName = lastNameFromPreviousSubmittedForm;
        req.sessionModel.unset('lastNameUserEntered');
      }
      if (emailFromPreviousSubmittedForm || emailFromPreviousSubmittedForm === '') {
        locals.values.email = emailFromPreviousSubmittedForm;
        req.sessionModel.unset('emailUserEntered');
      }
      if (teamFromPreviousSubmittedForm || teamFromPreviousSubmittedForm === '') {
        locals.values.teamSelect = teamFromPreviousSubmittedForm;
        req.sessionModel.unset('teamIdUserSelected');
      }
      callback(null, locals);
    });
  }
}

module.exports = UserCreateController;