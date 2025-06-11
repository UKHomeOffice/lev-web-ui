const config = require("../config");
const IamApiService = require("../services/UserManagement/IamApiService");
const SyopsRenewalNotRequired = require("../helpers/SyopsRenewalNotRequired");
const { iamApi } = require("../config");
const requestOptions = require('../helpers/requestOptions');
const redisService = require("../lib/redisCacheService");
const logger = require('hmpo-logger').get();

module.exports.syopsAcceptanceCheck = async (req, res, next) => {
  if(config.bypassSyops) {
    return next()
  }

  try {
    console.log("LOOKING IN CACHE")
    console.log(iamApi.username)
    console.log(await redisService.get(`${iamApi.username}:SyopsAccepted`))

    if (await redisService.get(`${iamApi.username}:SyopsAccepted`)) {
      console.log("USER IN CACHE FOUND")
      return next()
    }

    console.log("NOT IN CACHE - FETCHING FROM API")
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