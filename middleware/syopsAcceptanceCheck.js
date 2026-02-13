const config = require("../config");
const SyopsRenewalNotRequired = require("../helpers/SyopsRenewalNotRequired");
const redisService = require("../lib/redisCacheService");
const getUserMetadata = require("../helpers/getUserMetadata");
const logger = require('../logger').get();
const userDetails = require('../helpers/userDetails');

module.exports.syopsAcceptanceCheck = async (req, res, next) => {
  if(config.bypassSyops) {
    return next()
  }

  try {
    const data = await getUserMetadata(req);
    await userDetails(req, data);
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
    next(err);
  }
}