const config = require("../config");
const { iamApi } = require("../config");
const requestOptions = require('../helpers/requestOptions');
const redisService = require("../lib/redisCacheService");
const getUserOrganisation = require("../helpers/getUserOrganisation");
const { getRequest } = require("../services/UserManagement/IamApiService");
const logger = require('hmpo-logger').get();

module.exports.flsSchemaCache = async (req) => {

  if (!config.fls.enabled) { return }

  let flsSchema;

  try {
    flsSchema = await redisService.get(`flsSchema:${await getUserOrganisation(req)}`);

    if (flsSchema) return JSON.parse(flsSchema);

    const organisationInfo = await getRequest({
      ...requestOptions(req, iamApi),
      url: `/admin/organisations/${await getUserOrganisation(req)}`,
    });

    flsSchema = organisationInfo.flsSchema;
    await redisService.set(`flsSchema:${await getUserOrganisation(req)}`, JSON.stringify(flsSchema), config.fls.schemaCacheSeconds);

    return flsSchema;
  }
  catch (err) {
    logger.log('error', err);
  }
}