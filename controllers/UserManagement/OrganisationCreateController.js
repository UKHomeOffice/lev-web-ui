const BaseController = require('../BaseController');
const {postRequest} = require('../../services/UserManagement/UserActionsService');
const teamPermissionsObjectBuilder = require('../../helpers/teamPermissionsObjectBuilder');

class OrganisationCreateController extends BaseController {

  async saveValues(req, res, next) {

    // Get the values from the form
    const organisationName = req.form.values['organisationName'];

    try {
      req.sessionModel.set('addOrgAttempt', true);

      const orgResult = await postRequest({
        ...this.getOptions(req),
        url: '/admin/organisations',
      }, { organisationName: organisationName });

      const createdOrg = orgResult.organisation;

      const defaultTeamName = 'Administrators';
      const defaultTeamPermissions = ['birth', 'death', 'marriage', 'partnership', 'user-management' ];
      const defaultTeamPermissionsObject= teamPermissionsObjectBuilder(defaultTeamPermissions, next);

      await postRequest( {
        ...this.getOptions(req),
        url: `/admin/organisations/${createdOrg.id}/teams`,
      }, { teamName: defaultTeamName, teamPermissions: defaultTeamPermissionsObject });

      req.sessionModel.set('addOrgSuccess', true);

    } catch (err) {
      req.sessionModel.set('addOrgSuccess', false);
      if (err.status === 409) {
        req.sessionModel.set('orgExistsError', true);
      }
    }

    req.sessionModel.set('addedOrgName', organisationName);
    res.redirect('/admin/organisations');
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      callback(null, locals);
    });
  }
}

module.exports = OrganisationCreateController;
