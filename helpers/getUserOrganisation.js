// this extracts the organisation id for a user from the request - it could come from many places - e.g. local env files, gatekeeper or adapter, hence the chain

const IamApiService = require("../services/UserManagement/IamApiService");
const requestOptions = require("./requestOptions");
const { iamApi } = require("../config");

module.exports = async (req) => {
  if (!req || process.env.ORGANISATION_ID) {
    return process.env.ORGANISATION_ID || '';
  }

  const data = await IamApiService.getRequest({
    ...requestOptions(req, iamApi),
    url: '/user/metadata'
  });

  return await data.organisationId;
};