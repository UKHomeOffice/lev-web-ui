const getUserMetadata = require("./getUserMetadata");
const logger = require("../logger").get();

module.exports = async (req) => {
  try {
    const metadata = await getUserMetadata(req);
    if (metadata) {
      req.userDetails = {
        orgId: metadata.organisationId,
        orgName: metadata.organisationName,
        teamId: metadata.teamId,
        teamName: metadata.teamName,
        username: metadata.user
      };
    }
  } catch (err) {
    logger.log('error', err);
  }
}