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

    const userMetadata = await getUserMetadata();

    console.log("USERMETADATA")
    console.log(userMetadata)

    flsSchema = await redisService.get(`flsSchema:${userMetadata.organisationId}`);

    console.log("REDIS SCHEMA FETCH ")
    console.log(flsSchema)

    if (flsSchema) return JSON.parse(flsSchema);

    const orgId = process.env.ORGANISATION_ID || userMetadata.organisationId;

    console.log("ORG ID FROM METADATA")
    console.log(orgId);

    console.log("REQUEST OBJ")
    console.log(req)

    const organisationInfo = await getRequest({
      ...requestOptions(req, iamApi),
      url: `/admin/organisations/${orgId}`,
    });

    console.log("ORGANISATION INFO")
    console.log(organisationInfo)

    flsSchema = organisationInfo.flsSchema;
    await redisService.set(`flsSchema:${userMetadata.orgId}`, JSON.stringify(flsSchema), config.fls.schemaCacheSeconds);

    return flsSchema;
  }
  catch (err) {
    logger.log('error', err);
  }
}