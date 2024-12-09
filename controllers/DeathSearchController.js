'use strict';

const DateController = require('./DateController');
const { getCurrentTimeInMillis, incrementErrorMetrics, incrementRequestMetrics } = require('../lib/metrics');
const DeathSearchService = require('../services/DeathSearchService');
const requestOptions = require("../helpers/requestOptions");
const { api } = require("../config");

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
          searchParams: { forenames, surname, date }
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
