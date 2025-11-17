const {getRequest} = require("../services/UserManagement/IamApiService");
const requestOptions = require("./requestOptions");
const {iamApi} = require("../config");
let refreshCache = true;

module.exports.serviceNotificationCache = async (req) => {
  try {
    const notificationResults = await getRequest({
      ...requestOptions(req, iamApi),
      url: `/admin/notify-users/get-live-notification`,
    });

    refreshCache = false;

    if (notificationResults.serviceNotification === undefined) {
      return null;
    }

    return notificationResults.serviceNotification;
  } catch (err) {
    return null;
  }
}

module.exports.refreshServiceNotificationCache = () => {
  refreshCache = true;
}

module.exports.serviceNotificationGetRefreshCacheValue = () => {
  return refreshCache;
}