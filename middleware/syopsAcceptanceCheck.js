const OrganisationRestApiModel = require("../models/OrganisationRestApiModel");
const config = require("../config");
const OrganisationSearchService = require("../services/UserManagement/OrganisationSearchService");
const syopsDateCheck = require("../helpers/syopsDateCheck");

module.exports.syopsAcceptanceCheck = async (req, res, next) => {
  const data = await OrganisationSearchService.orgLookup({
    ...config,
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