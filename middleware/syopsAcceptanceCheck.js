const config = require("../config");
const IamApiService = require("../services/UserManagement/IamApiService");
const SyopsRenewalNotRequired = require("../helpers/SyopsRenewalNotRequired");
const { iamApi } = require("../config");
const requestOptions = require('../helpers/requestOptions');
const logger = require('hmpo-logger').get();

module.exports.syopsAcceptanceCheck = async (req, res, next) => {
  if(config.bypassSyops) {
    return next()
  }

  try {
    const data = await IamApiService.getRequest({
      ...requestOptions(req, iamApi),
      url: '/user/metadata'
    });

    const syopsAcceptanceDate = data.metadata.syopsAcceptedAt;

    if (!syopsAcceptanceDate || (config.syops.renewalDate && !SyopsRenewalNotRequired(syopsAcceptanceDate))) {
      res.locals.syopsAccepted = false;
      console.log("Redirecting to syops")
      console.log(!syopsAcceptanceDate)
      console.log(config.syops.renewalDate)
      console.log(req.url)
      res.redirect('/syops');
    }
    else {
      console.log("Syops Accepted and moving on...")
      console.log(req.url)
      res.locals.syopsAccepted = true;
      next();
    }
  }
  catch (err) {
    logger.log('error', err);
  }
}