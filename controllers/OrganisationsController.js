const BaseController = require('./BaseController');
const { orgLookup } = require('../services/OrganisationSearchService');

class OrganisationsController extends BaseController {
  async getValues(req, _res, next) {
    try {
      console.log(req);
      const searchResults = await orgLookup({
        ...this.getOptions(req),
        url: `/admin/organisations/${req.params.id}`
      });
      req.sessionModel.set('orgResults', searchResults);
      next();
    } catch (err) {
      console.log(err);
    }
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.orgInfo = req.sessionModel.get('orgResults') || [];
      callback(null, locals);
    });
  }
}

module.exports = OrganisationsController;
