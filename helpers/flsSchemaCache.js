const config = require("../config");
const { iamApi } = require("../config");
const requestOptions = require('../helpers/requestOptions');
const redisService = require("../lib/redisCacheService");
const getUserMetadata = require("./getUserMetadata");
const { getRequest } = require("../services/UserManagement/IamApiService");
const logger = require('hmpo-logger').get();

module.exports.flsSchemaCache = async (req) => {

  if (!config.fls.enabled) { return }

  let flsPayload;

  try {

    const userMetadata = await getUserMetadata(req);

    const orgId = process.env.ORGANISATION_ID || userMetadata.organisationId;

    flsPayload = await redisService.get(`flsSchema:${orgId}`);

    if (flsPayload) return JSON.parse(flsPayload);

    const organisationInfo = await getRequest({
      ...requestOptions(req, iamApi),
      url: `/admin/organisations/${orgId}`,
    });

    flsPayload = { flsSchema: organisationInfo.flsSchema, orgInfo: { name: organisationInfo.name, id: orgId } };
    await redisService.set(`flsSchema:${orgId}`, JSON.stringify(flsPayload), config.fls.schemaCacheSeconds);

    return flsPayload;
  }
  catch (err) {
    logger.log('error', err);
  }
}