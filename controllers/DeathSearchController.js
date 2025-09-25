'use strict';

const DateController = require('./DateController');
const { getCurrentTimeInMillis, incrementErrorMetrics, incrementRequestMetrics } = require('../lib/metrics');
const DeathSearchService = require('../services/DeathSearchService');
const requestOptions = require("../helpers/requestOptions");
const { api } = require("../config");
const searchValidation = require("../helpers/searchValidation");

class DeathSearchController extends DateController {

  /**
   * Get the form values and query the api
   *
   * @param req
   * @param _res
   * @param next
   */
  async validate(req, _res, next) {

    // Get the values from the search form
    const systemNumber = req.form.values['system-number'];
    const surname = req.form.values['surname'];
    const forenames = req.form.values['forenames'];
    const date = req.form.values['dobd'];

    // If systemNumber exists, perform lookup otherwise perform search
    if (systemNumber && systemNumber !== '') {

      // lookup
      const startTime = getCurrentTimeInMillis();

      try {
        const record = await DeathSearchService.lookup({
          ...requestOptions(req, api),
          url: `/v1/registration/death/${systemNumber}`
        });

        req.sessionModel.set('searchResults', record ? [record] : []);
        req.sessionModel.set('currentRecord', record ? 0 : -1);

        const endTime = getCurrentTimeInMillis();
        incrementRequestMetrics('lookup', 'death', this.getGroups(req), endTime - startTime);
        next();
      } catch (err) {
        const endTime = getCurrentTimeInMillis();
        incrementErrorMetrics('lookup', 'death', this.getGroups(req), endTime - startTime);
        next(err);
      }
    } else {

      // search
      const startTime = getCurrentTimeInMillis();

      try {
        const searchResults = await DeathSearchService.search({
          ...requestOptions(req, api),
          url: '/v1/registration/death',
          searchParams: {forenames, surname, date}
        });

        req.sessionModel.set('searchResults', searchResults);
        req.sessionModel.set('currentRecord', searchResults.length === 0 ? -1 : 0);

        const endTime = getCurrentTimeInMillis();
        incrementRequestMetrics('search', 'death', this.getGroups(req), endTime - startTime);
        next();
      } catch (err) {
        const endTime = getCurrentTimeInMillis();
        incrementErrorMetrics('search', 'death', this.getGroups(req), endTime - startTime);
        next(err);
      }
    }
  }

  async validateFields(req, res, callback) {
    super.validateFields(req, res, async (errors) => {
      const dayInput = req.form.values['dobd-day'];
      const monthInput = req.form.values['dobd-month'];
      const yearInput = req.form.values['dobd-year'];

      errors = errors || {};

      if (isNaN(dayInput)) {
        errors.dobd = new this.Error('dobd-day', {
          key: 'dobd',
          errorGroup: 'dobd',
          field: 'dobd-day',
          type: 'numeric-day'
        }, req, res);
      } else if (isNaN(monthInput)) {
        errors.dobd = new this.Error('dobd-month', {
          key: 'dobd',
          errorGroup: 'dobd',
          field: 'dobd-month',
          type: 'numeric-month'
        }, req, res);
      } else if (isNaN(yearInput)) {
        errors.dobd = new this.Error('dobd-year', {
          key: 'dobd',
          errorGroup: 'dobd',
          field: 'dobd-year',
          type: 'numeric-year'
        }, req, res);
      } else {
        const day = parseInt(dayInput);
        const month = parseInt(monthInput);
        const year = parseInt(yearInput);
        const maxDay = searchValidation.getDaysInMonth(month, year);

        if (month > 12 || month < 1){
          errors.dobd = new this.Error('dobd', {
            key: 'dobd',
            type: 'date-month',
          }, req, res);
        } else if (searchValidation.dateOutOfBounds(day, maxDay)) {
          errors.dobd = new this.Error('dobd', {
            key: 'dobd',
            type: 'date-day',
            message: `Date must be between 1 and ${maxDay}`
          }, req, res);
        }
      }
      callback(errors);
    });
  }


  /**
   * Returns true if we only have 1 result, otherwise false
   * @param req
   * @returns {*|boolean}
   */
  isSingleResult(req) {
    const searchResults = req.sessionModel.get('searchResults') || [];

    return searchResults && searchResults.length === 1;
  }
}

module.exports = DeathSearchController;
