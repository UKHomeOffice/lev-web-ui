const config = require("../config");
const OrganisationSearchService = require("../services/UserManagement/OrganisationSearchService");
const syopsDateCheck = require("../helpers/syopsDateCheck");
const { iamApi } = require("../config");

module.exports.syopsAcceptanceCheck = async (req, res, next) => {
  if(config.MOCK === "true") {
    return next()
  }

  const token = req.headers['x-auth-token'];
  const roles = req.headers['x-auth-roles'];

  let options = {
    headers: {
      'x-auth-aud': iamApi.client,
      'x-auth-username': iamApi.username,
      ...(token && { Authorization: `Bearer ${token}`}),
      ...(!token && roles && { 'x-auth-roles': roles })
    },
    https: {
      rejectUnauthorized: iamApi.rejectUnauthorized
    }
  };

  try {
    const data = await OrganisationSearchService.orgLookup({
      options,
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
    console.log(err)
  }
}