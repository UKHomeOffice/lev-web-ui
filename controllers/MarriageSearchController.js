'use strict';

const DateController = require('./DateController');
const {getCurrentTimeInMillis, incrementErrorMetrics, incrementRequestMetrics} = require('../lib/metrics');
const MarriageSearchService = require('../services/MarriageSearchService');
const requestOptions = require("../helpers/requestOptions");
const {api} = require("../config");
const searchValidation = require("../helpers/searchValidation");

class MarriageSearchController extends DateController {

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
    const dateOfMarriage = req.form.values['dom'];

    // If entryNumber exists, perform lookup otherwise perform search
    if (entryNumber && entryNumber !== '') {

      // lookup
      const startTime = getCurrentTimeInMillis();

      try {
        const record = await MarriageSearchService.lookup({
          ...requestOptions(req, api),
          url: `/v1/registration/marriage/${entryNumber}`
        });

        req.sessionModel.set('searchResults', record ? [record] : []);
        req.sessionModel.set('currentRecord', record ? 0 : -1);

        const endTime = getCurrentTimeInMillis();
        incrementRequestMetrics('lookup', 'marriage', this.getGroups(req), endTime - startTime);
        next();
      } catch (err) {
        const endTime = getCurrentTimeInMillis();
        incrementErrorMetrics('lookup', 'marriage', this.getGroups(req), endTime - startTime);
        next(err);
      }
    } else {

      // search
      const startTime = getCurrentTimeInMillis();

      try {
        const searchResults = await MarriageSearchService.search({
          ...requestOptions(req, api),
          url: '/v1/registration/marriage',
          searchParams: {forenames, surname, dateOfMarriage}
        });

        req.sessionModel.set('searchResults', searchResults);
        req.sessionModel.set('currentRecord', searchResults.length === 0 ? -1 : 0);

        const endTime = getCurrentTimeInMillis();
        incrementRequestMetrics('search', 'marriage', this.getGroups(req), endTime - startTime);
        next();
      } catch (err) {
        const endTime = getCurrentTimeInMillis();
        incrementErrorMetrics('search', 'marriage', this.getGroups(req), endTime - startTime);
        next(err);
      }
    }
  }

  async validateFields(req, res, callback) {
    super.validateFields(req, res, async (errors) => {
      const dayInput = req.form.values['dom-day'];
      const monthInput = req.form.values['dom-month'];
      const yearInput = req.form.values['dom-year'];

      errors = errors || {};

      if (isNaN(dayInput)) {
        errors.dom = new this.Error('dom-day', {
          key: 'dom',
          errorGroup: 'dom',
          field: 'dom-day',
          type: 'numeric-day'
        }, req, res);
      } else if (isNaN(monthInput)) {
        errors.dom = new this.Error('dom-month', {
          key: 'dom',
          errorGroup: 'dom',
          field: 'dom-month',
          type: 'numeric-month'
        }, req, res);
      } else if (isNaN(yearInput)) {
        errors.dom = new this.Error('dom-year', {
          key: 'dom',
          errorGroup: 'dom',
          field: 'dom-year',
          type: 'numeric-year'
        }, req, res);
      } else {
        const day = parseInt(dayInput);
        const month = parseInt(monthInput);
        const year = parseInt(yearInput);
        const maxDay = searchValidation.getDaysInMonth(month, year);

        if (month > 12 || month < 1){
          errors.dom = new this.Error('dom', {
            key: 'dob',
            type: 'date-month',
          }, req, res);
        } else if (searchValidation.dateOutOfBounds(day, maxDay)) {
          errors.dom = new this.Error('dom', {
            key: 'dom',
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

module.exports = MarriageSearchController;
