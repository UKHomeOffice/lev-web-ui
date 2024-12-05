'use strict';

const BaseController = require('./BaseController');
const OrganisationSearchService = require("../services/UserManagement/OrganisationSearchService");
const UserActionsService = require("../services/UserManagement/UserActionsService");
const config = require("../config");
const syopsDateCheck = require("../helpers/syopsDateCheck");

class SyopsController extends BaseController {
  // re-running of middleware function is if page is navigated directly to, to not render accept button if accepted already
  async getValues(req, res, next) {
    const data = await OrganisationSearchService.orgLookup({
      headers: {
        https: {
          rejectUnauthorized: config.iamApi.rejectUnauthorized
        }
      },
      url: '/user/metadata'
    });
    const syopsDate = data.metadata.syopsAcceptedAt;

    if(syopsDate && syopsDateCheck(syopsDate)) {
      req.sessionModel.set('syopsAccepted', true);
    } else {
      req.sessionModel.set('syopsAccepted', false);
    }
    next();
  }

  async saveValues(req, res) {
    await UserActionsService.postRequest({
      headers: {
        https: {
          rejectUnauthorized: config.iamApi.rejectUnauthorized
        }
      },
      url: '/user/syops'
    });
    res.redirect('/');
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.syopsAccepted = req.sessionModel.get('syopsAccepted');

      callback(null, locals);
    });
  }
}

module.exports = SyopsController;
