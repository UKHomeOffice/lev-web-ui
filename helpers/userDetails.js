const {getRequest} = require("../services/UserManagement/IamApiService");
const requestOptions = require("./requestOptions");
const {iamApi} = require("../config");
const logger = require("../logger");
const redisService = require("../lib/redisCacheService");

module.exports = async (req) => {
  try {
    let results;
    const userDetails = await redisService.get(`${process.env.IAM_USER}:UserDetails`);

    if (userDetails) {
      results = JSON.parse(userDetails);
    }
    else {
      results = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/organisations/users/${process.env.IAM_USER}`
      });

      await redisService.set(`${process.env.IAM_USER}:UserDetails`, JSON.stringify(results), 15);
    }

    if(results) {
      req.userDetails = {
        orgId: results.orgId,
        orgName: results.orgName,
        teamId: results.teamId,
        teamName: results.teamName,
        username: results.username
      };
    }
  } catch (err) {
    logger.log("ERROR", err);
  }
}