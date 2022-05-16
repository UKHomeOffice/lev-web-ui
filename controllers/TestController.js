'use strict';

const BirthDetailsContrtoller = require('./BirthDetailsController');
const logger = require('hmpo-app').logger.get('test-controller');

class TestController extends BirthDetailsContrtoller {
  locals(req, res, callback) {
    logger.info('locals()');

    const systemNumber = req && req.params && parseInt(req.params.id) || undefined;
    const searchResults = req && req.sessionModel.get('searchResults') || undefined;

    if (systemNumber && searchResults) {
      const currentRecord = searchResults.findIndex(record => record.id === systemNumber);

      logger.info(`id=${systemNumber}`);
      logger.info(`searchResults=${JSON.stringify(searchResults)}`);
      logger.info(`currentRecord=${JSON.stringify(currentRecord)}`);

      req.sessionModel.set('currentRecord', currentRecord);
    } else {
      req.sessionModel.unset('currentRecord');
    }

    super.locals(req, res, callback);
  }
}

module.exports = TestController;
