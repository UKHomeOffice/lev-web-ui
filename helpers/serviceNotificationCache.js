const {getRequest} = require("../services/UserManagement/IamApiService");
const requestOptions = require("./requestOptions");
const {iamApi} = require("../config");
const redisService = require("../lib/redisCacheService");
const logger = require('hmpo-logger').get();

module.exports.serviceNotificationCache = async (req) => {
  if (process.env.MOCK?.toLowerCase() === 'true') return;

  try {
    if(await redisService.get(`serviceNotificationLive`) === true)
      return null;

    const serviceNotificationPayload = JSON.parse(await redisService.get(`serviceNotification`));

    if (serviceNotificationPayload) {
      return serviceNotificationPayload.serviceNotification ? serviceNotificationPayload.serviceNotification : null;
    }

    const serviceNotificationResults = await getRequest({
      ...requestOptions(req, iamApi),
      url: `/admin/notify-users/get-live-notification`,
    });

    await redisService.set(`serviceNotification`, JSON.stringify(serviceNotificationResults));

    return serviceNotificationResults.serviceNotification;
  }
  catch (err) {
    logger.log('error', err);
  }
}