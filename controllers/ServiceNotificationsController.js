const BaseController = require('./BaseController');

class ServiceNotificationsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);
      locals.livemessage = "Message from the controller";

      callback(null, locals);
    });
  }
}

module.exports = ServiceNotificationsController;
