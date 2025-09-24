'use strict';

const DateController = require('./DateController');
const { getCurrentTimeInMillis, incrementErrorMetrics, incrementRequestMetrics } = require('../lib/metrics');
const PartnershipSearchService = require('../services/PartnershipSearchService');
const requestOptions = require("../helpers/requestOptions");
const { api } = require("../config");
const searchValidation = require("../helpers/searchValidation");

class PartnershipSearchController extends DateController {

  /**
   * Get the form values and query the api
   *
   * @param req
   * @param _res
   * @param next
   */
  async validate(req, _res, next) {

    // Get the values from the search form
    const entryNumber = req.form.values['entry-number'];
    const surname = req.form.values['surname'];
    const forenames = req.form.values['forenames'];
    const dateOfPartnership = req.form.values['dop'];

    // If entryNumber exists, perform lookup otherwise perform search
    if (entryNumber && entryNumber !== '') {

      // lookup
      const startTime = getCurrentTimeInMillis();

      try {
        const record = await PartnershipSearchService.lookup({
          ...requestOptions(req, api),
          url: `/v1/registration/partnership/${entryNumber}`
        });

        req.sessionModel.set('searchResults', record ? [record] : []);
        req.sessionModel.set('currentRecord', record ? 0 : -1);

        const endTime = getCurrentTimeInMillis();
        incrementRequestMetrics('lookup', 'partnership', this.getGroups(req), endTime - startTime);
        next();
      } catch (err) {
        next(err);
      }
    } else {

      // search
      const startTime = getCurrentTimeInMillis();

      try {
        const searchResults = await PartnershipSearchService.search({
          ...requestOptions(req, api),
          url: '/v1/registration/partnership',
          searchParams: { forenames, surname, dateOfPartnership }
        });

        req.sessionModel.set('searchResults', searchResults);
        req.sessionModel.set('currentRecord', searchResults.length === 0 ? -1 : 0);

        const endTime = getCurrentTimeInMillis();
        incrementRequestMetrics('search', 'partnership', this.getGroups(req), endTime - startTime);
        next();
      } catch (err) {
        const endTime = getCurrentTimeInMillis();
        incrementErrorMetrics('search', 'partnership', this.getGroups(req), endTime - startTime);
        next(err);
      }
    }
  }

  async validateFields(req, res, callback) {
    super.validateFields(req, res, async (errors) => {
      const dayInput = req.form.values['dop-day'];
      const monthInput = req.form.values['dop-month'];
      const yearInput = req.form.values['dop-year'];

      errors = errors || {};

      if (isNaN(dayInput)) {
        errors.dop = new this.Error('dop-day', {
          key: 'dop',
          errorGroup: 'dop',
          field: 'dop-day',
          type: 'numeric-day'
        }, req, res);
      } else if (isNaN(monthInput)) {
        errors.dop = new this.Error('dop-month', {
          key: 'dop',
          errorGroup: 'dop',
          field: 'dop-month',
          type: 'numeric-month'
        }, req, res);
      } else if (isNaN(yearInput)) {
        errors.dop = new this.Error('dop-year', {
          key: 'dop',
          errorGroup: 'dop',
          field: 'dop-year',
          type: 'numeric-year'
        }, req, res);
      } else {

        const day = parseInt(dayInput);
        const month = parseInt(monthInput);
        const year = parseInt(yearInput);
        const maxDay = searchValidation.getDaysInMonth(month, year);

        if (month > 12 || month < 1){
          errors.dop = new this.Error('dop', {
            key: 'dop',
            type: 'date-month',
          }, req, res);
        } else if (searchValidation.dateOutOfBounds(day, maxDay)) {
          errors.dop = new this.Error('dop', {
            key: 'dop',
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

module.exports = PartnershipSearchController;
