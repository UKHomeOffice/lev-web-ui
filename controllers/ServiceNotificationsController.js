const BaseController = require('./BaseController');
const {getRequest, postRequest, deleteRequest} = require("../services/UserManagement/IamApiService");
const requestOptions = require("../helpers/requestOptions");
const {iamApi} = require("../config");

class ServiceNotificationsController extends BaseController {
  async getValues(req, _res, next) {

    try {
      const notificationResults = await getRequest({
        ...requestOptions(req, iamApi),
        url: `/admin/notify-users/get-live-notification`,
      });

      req.sessionModel.set('liveNotification', notificationResults.serviceNotification);
      req.sessionModel.set('receivedNotification', true);

      if(notificationResults.serviceNotification === undefined) {
        req.sessionModel.unset('receivedNotification');
      }

      next();
    } catch (err) {
      req.sessionModel.unset('receivedNotification');
      err.template = 'errors/organisation-error';
      next(err);
    }
  }

  async validateFields(req, res, callback) {
    super.validateFields(req, res, async (errors) => {
      errors = errors || {};

      if(req.path === '/enter-message') {
        if (errors.newNotification) {
          if (errors.newNotification.type === 'required') {
            errors.newNotification.message = 'Enter message';
          } else if (errors.newNotification.type === 'regex') {
            errors.newNotification.message = 'Message can only include letters, numbers and punctuation (:,.?!-)';
          } else if (errors.newNotification.type === 'length') {
            errors.newNotification.message = 'Message must be 150 characters or less';
          }
        }
        req.sessionModel.set('newNotification', req.body.newNotification.trim().replace(/(\r\n|\n|\r)/g, ' ').replace(/\s+/g, ' '));
      }

      callback(errors);
    });
  }

  async saveValues(req, res, next) {
    if(req.path === '/enter-message') {
      req.sessionModel.set('newNotification', req.body.newNotification.trim().replace(/(\r\n|\n|\r)/g, ' ').replace(/\s+/g, ' '));
    } else if(req.path === '/summary') {
      try {
        await postRequest( {
          ...requestOptions(req, iamApi),
          url: `/admin/notify-users/post-live-notification`
        }, { submittedNotification: req.sessionModel.get('newNotification')});


        req.sessionModel.set('liveNotification', req.sessionModel.get('newNotification'));
        req.sessionModel.set('liveMessageSubmitSuccessful', true);
        req.sessionModel.unset('newNotification');
      } catch (_err) {
        req.sessionModel.set('liveNotification', req.sessionModel.get('newNotification'));
        req.sessionModel.unset('newNotification');
        req.sessionModel.unset('liveMessageSubmitSuccessful');
      }
    }
    else if(this.isDeleteClicked(req)) {
      try {
        await deleteRequest({
          ...requestOptions(req, iamApi),
          url: `/admin/notify-users/delete-live-notification`
        });

        req.sessionModel.set('liveMessageDeleteSuccessful', true);
      } catch(_err) {
        req.sessionModel.unset('liveMessageDeleteSuccessful');
      }
    }
    next();
  }

  isDeleteClicked(req) {
    return req.body["delete-notification"] !== undefined;
  }

  locals(req, res, callback) {
    super.locals(req, res, (error, locals) => {
      if (error) return callback(error);

      if(req.path === '/') {
        req.sessionModel.unset('newNotification');
        req.sessionModel.unset('submittedNotification');
      }

      locals.liveNotification = req.sessionModel.get('liveNotification') || [];
      locals.newNotification = req.sessionModel.get('newNotification') || [];
      locals.liveMessageSubmitSuccessful = req.sessionModel.get('liveMessageSubmitSuccessful') || false;
      locals.liveMessageDeleteSuccessful = req.sessionModel.get('liveMessageDeleteSuccessful') || false;
      locals.receivedNotification = req.sessionModel.get('receivedNotification') || [];

      if(req.path === '/summary') {
        locals.submittedNotification = req.sessionModel.get('newNotification') || [];
        locals.backLink = '/admin/notify-users/enter-message';
      } else if(req.path === '/enter-message') {
        locals.backLink = '/admin/notify-users';
      } else {
        locals.backLink = false;
      }

      req.session.liveNotification = req.sessionModel.get('liveNotification') || [];
      req.session.submittedNotification = req.sessionModel.get('submittedNotification') || [];
      req.sessionModel.unset('liveMessageSubmitSuccessful');
      req.sessionModel.unset('liveMessageDeleteSuccessful');
      req.sessionModel.unset('receivedNotification');

      callback(null, locals);
    });
  }
}

module.exports = ServiceNotificationsController;
