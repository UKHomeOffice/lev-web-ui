'use strict';

const DateController = require('./DateController');
const { getCurrentTimeInMillis, incrementErrorMetrics, incrementRequestMetrics } = require('../lib/metrics');
const BirthSearchService = require('../services/BirthSearchService');

class BirthSearchController extends DateController {

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
    const dateOfBirth = req.form.values['dob'];

    // If systemNumber exists, perform lookup otherwise perform search
    if (systemNumber && systemNumber !== '') {

      // lookup
      const startTime = getCurrentTimeInMillis();

      try {
        const record = await BirthSearchService.lookup({
          ...this.getOptions(req),
          url: `/v1/registration/birth/${systemNumber}`
        });

        req.sessionModel.set('searchResults', record ? [record] : []);
        req.sessionModel.set('currentRecord', record ? 0 : -1);

        const endTime = getCurrentTimeInMillis();
        incrementRequestMetrics('lookup', 'birth', this.getGroups(req), endTime - startTime);
        next();
      } catch (err) {
        const endTime = getCurrentTimeInMillis();
        incrementErrorMetrics('lookup', 'birth', this.getGroups(req), endTime - startTime);
        next(err);
      }
    } else {

      // search
      const startTime = getCurrentTimeInMillis();

      try {
        const searchResults = await BirthSearchService.search({
          ...this.getOptions(req),
          url: '/v1/registration/birth',
          searchParams: { forenames, surname, dateOfBirth }
        });

        req.sessionModel.set('searchResults', searchResults);
        req.sessionModel.set('currentRecord', searchResults.length === 0 ? -1 : 0);

        const endTime = getCurrentTimeInMillis();
        incrementRequestMetrics('search', 'birth', this.getGroups(req), endTime - startTime);
        next();
      } catch (err) {
        const endTime = getCurrentTimeInMillis();
        incrementErrorMetrics('search', 'birth', this.getGroups(req), endTime - startTime);
        next(err);
      }
    }
  }

  /**
   * Returns true if we only have 1 result, otherwise false
   * @param req
   * @param _res
   * @param _con
   * @returns {*|boolean}
   */
  isSingleResult(req, _res, _con) {
    const searchResults = req.sessionModel.get('searchResults') || [];

    return searchResults && searchResults.length === 1;
  }
}

module.exports = BirthSearchController;
