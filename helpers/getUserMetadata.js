const redisService = require("../lib/redisCacheService");
const getCurrentUser = require("./getCurrentUser");
const IamApiService = require("../services/UserManagement/IamApiService");
const requestOptions = require("./requestOptions");
const { iamApi } = require("../config");
const config = require("../config");

module.exports = async (req) => {

  const username = getCurrentUser(req);
  console.log("***USERNAME:" + username + " ***");

  const userMetadata = await redisService.get(`${username}:UserMetadata`);

  if (userMetadata) {
    return JSON.parse(userMetadata);
  }

  const metadata = await IamApiService.getRequest({
    ...requestOptions(req, iamApi),
    url: '/user/metadata'
  });

  await redisService.set(`${username}:UserMetadata`, JSON.stringify(metadata), config.syops.metadataCacheSeconds);

  return metadata;
}