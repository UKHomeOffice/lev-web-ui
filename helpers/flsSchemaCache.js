const config = require("../config");
const { iamApi } = require("../config");
const requestOptions = require('../helpers/requestOptions');
const redisService = require("../lib/redisCacheService");
const getUserMetadata = require("./getUserMetadata");
const { getRequest } = require("../services/UserManagement/IamApiService");
const logger = require('hmpo-logger').get();

module.exports.flsSchemaCache = async (req) => {

  if (!config.fls.enabled) { return }

  let flsSchema;

  try {

    const userMetadata = await getUserMetadata(req);

    const orgId = process.env.ORGANISATION_ID || userMetadata.organisationId;

    flsSchema = await redisService.get(`flsSchema:${orgId}`);

    if (flsSchema) return JSON.parse(flsSchema);

    const organisationInfo = await getRequest({
      ...requestOptions(req, iamApi),
      url: `/admin/organisations/${orgId}`,
    });

    flsSchema = organisationInfo.flsSchema;
    await redisService.set(`flsSchema:${orgId}`, JSON.stringify(flsSchema), config.fls.schemaCacheSeconds);

    return flsSchema;
  }
  catch (err) {
    logger.log('error', err);
  }
}