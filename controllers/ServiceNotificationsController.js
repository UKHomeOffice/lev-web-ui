const BaseController = require('./BaseController');
const { getRequest } = require('../services/ServiceNotificationsService');
const requestOptions = require("../helpers/requestOptions");
const { iamApi } = require("../config");

class ServiceNotificationsController extends BaseController {
  async getValues(req, _res, next) {
    try {
      const messageResult = await getRequest({
        ...requestOptions(req, iamApi),
        url: '/admin/notify-users'
      });

      console.log(messageResult);
      // const serviceMessage = messageResult.serviceMessage;
      //
      // req.sessionModel.set('serviceMessage', serviceMessage);
      // next();

    } catch (err) {
      err.template = 'errors/error';
      next(err);
    }
  }
}

module.exports = ServiceNotificationsController;
