'use strict';

const DateController = require('./DateController');
const { getCurrentTimeInMillis, incrementErrorMetrics, incrementRequestMetrics } = require('../lib/metrics');
const PartnershipSearchService = require('../services/PartnershipSearchService');
const requestOptions = require("../helpers/requestOptions");
const { api } = require("../config");

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
