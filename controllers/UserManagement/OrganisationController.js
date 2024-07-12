const BaseController = require('../BaseController');
const { orgLookup } = require('../../services/UserManagement/OrganisationSearchService');

class OrganisationController extends BaseController {
  async getValues(req, _res, next) {
    try {
      const searchResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.id}`,
      });
      const teamResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.id}/teams`
      });

      let queryParamString = '';
      let paramArray = [];
      if (req.query.page) paramArray.push(`page=${req.query.page}`);
      if (req.query.perPage) paramArray.push(`perPage=${req.query.perPage}`);
      if (req.query.sort) paramArray.push(`sort=${req.query.sort}`);
      if (req.query.order) paramArray.push(`order=${req.query.order}`);

      for (let i = 0; i < paramArray.length; i++) {
        if (i == 0) {
          queryParamString = queryParamString.concat(`?${paramArray[i]}`);
        } else {
          queryParamString = queryParamString.concat(`&&${paramArray[i]}`);
        }
      }
      const userResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.id}/users${queryParamString}`
      });

      req.sessionModel.set('orgResults', searchResults);
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
      locals.orgInfo = req.sessionModel.get('orgResults') || [];
      locals.teams = req.sessionModel.get('teamResults') || [];
      locals.users = req.sessionModel.get('userResults') || [];
      locals.usersMetaData = req.sessionModel.get('usersMetaData') || { total: 0, currentPage: 1};
      callback(null, locals);
    });
  }
}

module.exports = OrganisationController;
