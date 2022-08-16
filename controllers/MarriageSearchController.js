'use strict';

const DateController = require('./DateController');
const { incrementRequestMetrics } = require('../routes/metrics');
const MarriageSearchService = require('../services/MarriageSearchService');

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
    const systemNumber = req.form.values['system-number'];
    const surname = req.form.values['surname'];
    const forenames = req.form.values['forenames'];
    const dateOfMarriage = req.form.values['dom'];

    // If systemNumber exists, perform lookup otherwise perform search
    if (systemNumber && systemNumber !== '') {

      try {

        // lookup
        const record = await MarriageSearchService.lookup({
          ...this.getOptions(req),
          url: `/v1/registration/marriage/${systemNumber}`
        });

        req.sessionModel.set('searchResults', record ? [record] : []);
        req.sessionModel.set('currentRecord', record ? 0 : -1);

        incrementRequestMetrics('lookup', 'marriage', this.getGroups(req));
        next();
      } catch (err) {
        next(err);
      }
    } else {

      // search
      try {
        const searchResults = await MarriageSearchService.search({
          ...this.getOptions(req),
          url: '/v1/registration/marriage',
          searchParams: { forenames, surname, dateOfMarriage }
        });

        req.sessionModel.set('searchResults', searchResults);
        req.sessionModel.set('currentRecord', searchResults.length === 0 ? -1 : 0);

        incrementRequestMetrics('search', 'marriage', this.getGroups(req));
        next();
      } catch (err) {
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

module.exports = MarriageSearchController;
