const config = require("../config");
const OrganisationSearchService = require("../services/UserManagement/OrganisationSearchService");
const syopsDateCheck = require("../helpers/syopsDateCheck");
const { iamApi } = require("../config");
const requestOptions = require('../helpers/requestOptions');
const logger = require('hmpo-logger').get();

module.exports.syopsAcceptanceCheck = async (req, res, next) => {
  if(config.MOCK === "true") {
    return next()
  }

  try {
    const data = await OrganisationSearchService.orgLookup({
      ...requestOptions(req, iamApi),
      url: '/user/metadata'
    });
    const syopsDate = data.metadata.syopsAcceptedAt;
    if(syopsDate && syopsDateCheck(syopsDate)) {
      res.locals.syopsAccepted = true;
      next();
    } else {
      res.locals.syopsAccepted = false;
      res.render('pages/syops/index')
    }
  }
  catch (err) {
    logger.log('error', err);
  }
}