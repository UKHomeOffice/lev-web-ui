const {getRequest} = require("../services/UserManagement/IamApiService");
const requestOptions = require("./requestOptions");
const {iamApi} = require("../config");
let refreshCache = true;

module.exports.serviceNotificationCache = async (req) => {
  let response = null;
  if(refreshCache) {
    try {
      const notificationResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/notify-users/get-live-notification`,
      });

      if (notificationResults.serviceNotification === undefined) {
        return response;
      }

      response = notificationResults.serviceNotification;
      refreshCache = false;
    } catch (err) {
      return null;
    }

  }
  return response;
}

module.exports.refreshServiceNotificationCache = () => {
  refreshCache = true;
}