'use strict';

const { Controller } = require('hmpo-form-wizard');
const DateControllerMixin = require('hmpo-components').mixins.Date;
const DateController = DateControllerMixin(Controller);

class BirthSearchController extends DateController {
  validate(req, res, next) {
    const searchTerms = {
      systemNumber: req.form.values['system-number'],
      surname: req.form.values['surname'],
      forenames: req.form.values['forenames'],
      dob: req.form.values['dob']
    }

    req.sessionModel.set('searchTerms', searchTerms);
    next();
  }
}

module.exports = BirthSearchController
