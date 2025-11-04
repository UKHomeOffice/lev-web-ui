const BaseController = require('./BaseController');
const {getRequest, postRequest, deleteRequest} = require("../services/UserManagement/IamApiService");
const requestOptions = require("../helpers/requestOptions");
const {iamApi} = require("../config");

class ServiceNotificationsController extends BaseController {
  async getValues(req, _res, next) {

    try {
      this.validateGetRequest(req, _res, next);

      const notificationResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/notify-users`,
      });

      req.sessionModel.set('liveNotification', notificationResults.service_notification);
      req.sessionModel.set('receivedNotification', true);

      if(notificationResults.service_notification === undefined) {
        req.sessionModel.unset('receivedNotification');
      }

      next();
    } catch (err) {
      req.sessionModel.unset('receivedNotification');
      next();
    }
  }

  async validateFields(req, res, callback) {
    super.validateFields(req, res, async (errors) => {
      errors = errors || {};

      if(errors.newNotification) {
        if (errors.newNotification.type === 'required') {
          errors.newNotification.message = 'Enter message';
        } else if (errors.newNotification.type === 'regex') {
          errors.newNotification.message = 'Message can only include letters, numbers and punctuation (:,.?!-)';
        } else if (errors.newNotification.type === 'length') {
          errors.newNotification.message = 'Message must be 150 characters or less';
        }
      }

      callback(errors);
    });
  }

  async saveValues(req, _res, next) {
    if(req.path === '/enter-message') {
      req.sessionModel.set('newNotification', req.body.newNotification);
    } else if(req.path === '/summary') {
      try {
        if(req.sessionModel.get('liveNotification')) {
          await deleteRequest({
            ...requestOptions(req, iamApi),
            url: `/admin/notify-users/delete-live-notification`,
          });
        }

        await postRequest( {
          ...requestOptions(req, iamApi),
          url: `/admin/notify-users/submit/${req.sessionModel.get('newNotification')}`,
        }, { liveNotification: req.sessionModel.get('newNotification')});

        req.sessionModel.set('liveNotification', req.sessionModel.get('newNotification'));
        req.sessionModel.set('liveMessageSubmitSuccessful', true);
        req.sessionModel.unset('newNotification');

      } catch (err) {
        req.sessionModel.set('liveNotification', req.sessionModel.get('newNotification'));
        req.sessionModel.unset('newNotification');
        req.sessionModel.unset('liveMessageSubmitSuccessful');
      }
    }

    next();
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      if(req.path === '/') {
        req.sessionModel.unset('newNotification');
      }

      locals.liveNotification = req.sessionModel.get('liveNotification') || [];
      locals.newNotification = req.sessionModel.get('newNotification') || [];
      locals.liveMessageSubmitSuccessful = req.sessionModel.get('liveMessageSubmitSuccessful') || false;
      locals.receivedNotification = req.sessionModel.get('receivedNotification') || [];
      locals.backLink = false;

      req.session.liveNotification = req.sessionModel.get('liveNotification') || [];
      req.sessionModel.unset('liveMessageSubmitSuccessful');
      req.sessionModel.unset('receivedNotification');

      callback(null, locals);
    });
  }
}

module.exports = ServiceNotificationsController;
