const config = require("../config");
const IamApiService = require("../services/UserManagement/IamApiService");
const SyopsRenewalNotRequired = require("../helpers/SyopsRenewalNotRequired");
const { iamApi } = require("../config");
const requestOptions = require('../helpers/requestOptions');
const redisService = require("../lib/redisCacheService");
const getCurrentUser = require("../helpers/getCurrentUser");
const logger = require('hmpo-logger').get();

module.exports.syopsAcceptanceCheck = async (req, res, next) => {
  if(config.bypassSyops) {
    return next()
  }

  try {
    if (await redisService.get(`${getCurrentUser(req)}:SyopsAccepted`)) {
      return next()
    }

    const data = await IamApiService.getRequest({
      ...requestOptions(req, iamApi),
      url: '/user/metadata'
    });

    const syopsAcceptanceDate = data.metadata.syopsAcceptedAt;

    if (!syopsAcceptanceDate || (config.syops.renewalDate && !SyopsRenewalNotRequired(syopsAcceptanceDate))) {
      res.locals.syopsAccepted = false;
      res.redirect('/syops');
    }
    else {
      res.locals.syopsAccepted = true;
      await redisService.set(`${data.user}:SyopsAccepted`, true, config.syops.metadataCacheSeconds);
      next();
    }
  }
  catch (err) {
    logger.log('error', err);
  }
}