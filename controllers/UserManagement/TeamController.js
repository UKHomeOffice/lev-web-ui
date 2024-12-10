const BaseController = require('../BaseController');
const { getRequest } = require('../../services/UserManagement/IamApiService');
const queryParamsBuilder = require("../../helpers/queryParamsBuilder");
const requestOptions = require("../../helpers/requestOptions");
const { iamApi } = require("../../config");

class TeamController extends BaseController {
  async getValues(req, _res, next) {
    try {
      const teamResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}`
      });

      const userResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/${req.params.orgId}/teams/${req.params.teamId}/users${queryParamsBuilder(req)}`
      });

      req.sessionModel.set('teamResults', teamResults);
      req.sessionModel.set('userResults', userResults.users);
      req.sessionModel.set('usersMetaData', userResults.metadata);

      next();
    } catch (err) {
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.teamInfo = req.sessionModel.get('teamResults') || {};
      locals.users = req.sessionModel.get('userResults') || {};
      locals.usersMetaData = req.sessionModel.get('usersMetaData') || { total: 0, currentPage: 1, perPage: 20};
      locals.deletedUser = req.sessionModel.get('deletedUser') || '';
      locals.addedUser = req.sessionModel.get('addedUser') || false;
      locals.userFullName = req.sessionModel.get('userFullName') || '';
      locals.errorMessage = req.sessionModel.get('errorMessage') || '';
      locals.IS_EXTERNAL = process.env.IS_EXTERNAL || 'true';

      req.sessionModel.unset('deletedUser');
      req.sessionModel.unset('addedUser');
      req.sessionModel.unset('userFullName');
      req.sessionModel.unset('errorMessage');
      callback(null, locals);
    });
  }
}

module.exports = TeamController;
