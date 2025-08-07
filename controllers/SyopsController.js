'use strict';

const BaseController = require('./BaseController');
const IamApiService = require("../services/UserManagement/IamApiService");
const SyopsRenewalRequired = require("../helpers/SyopsRenewalNotRequired");
const requestOptions = require('../helpers/requestOptions');
const getUserMetadata = require("../helpers/getUserMetadata");
const { iamApi, syops } = require("../config");
const redisService = require("../lib/redisCacheService");
const logger = require('hmpo-logger').get();

class SyopsController extends BaseController {
  // re-running of middleware function is if page is navigated directly to, to not render accept button if accepted already
  async getValues(req, res, next) {
    try {
      const data = await getUserMetadata(req);

      const syopsDate = data.metadata.syopsAcceptedAt;

      req.sessionModel.set('syopsAccepted', false);

      if(syopsDate && (!syops.renewalDate || SyopsRenewalRequired(syopsDate))) {
        req.sessionModel.set('syopsAccepted', true);
      }
    }
    catch (err) {
      logger.log('error', err);
    }
    next();
  }

  async saveValues(req, res) {
    const metadata = await IamApiService.postRequest({
      ...requestOptions(req, iamApi),
      url: '/user/syops'
    });

    await redisService.del(`${metadata.user}:UserMetadata`);

    res.redirect(req.session.originalRequestUrl || '/');
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
