const {
  incrementRequestMetrics,
  getCurrentTimeInMillis,
  incrementErrorMetrics,
  promMetrics
} = require('../../lib/metrics');

describe('metric tests', () => {
  const dataSets = ['birth', 'death', 'marriage', 'partnership'];

  describe('req counter', () => {
    const reqCounter = jest.spyOn(promMetrics.req, 'inc');
    const lookUpCounter = jest.spyOn(promMetrics.req.lookup, 'inc');
    const searchCounter = jest.spyOn(promMetrics.req.search, 'inc');

    describe('lookups', () => {
      dataSets.forEach((dataSet) => {
        test(`${dataSet} dataset counter incremented`, () => {

          const datasetCounter = jest.spyOn(promMetrics.req[dataSet], 'inc');
          incrementRequestMetrics('lookup', dataSet, ['test-group'], 1);

          expect(datasetCounter).toHaveBeenCalled();
          expect(reqCounter).toHaveBeenCalled();
          expect(lookUpCounter).toHaveBeenCalled();
        });
      });
    });
    describe('searches', () => {
      dataSets.forEach((dataSet) => {
        test(`${dataSet} dataset counter incremented`, () => {

          const datasetCounter = jest.spyOn(promMetrics.req[dataSet], 'inc');
          incrementRequestMetrics('search', dataSet, ['test-group'], 1);
          expect(datasetCounter).toHaveBeenCalled();
          expect(reqCounter).toHaveBeenCalled();
          expect(searchCounter).toHaveBeenCalled();
        });
      });
    });
  });

  describe('err counter', () => {
    const reqCounter = jest.spyOn(promMetrics.err, 'inc');
    const lookUpCounter = jest.spyOn(promMetrics.err.lookup, 'inc');
    const searchCounter = jest.spyOn(promMetrics.err.search, 'inc');

    describe('lookups', () => {
      dataSets.forEach((dataSet) => {
        test(`${dataSet} dataset counter incremented`, () => {

          const datasetCounter = jest.spyOn(promMetrics.req[dataSet], 'inc');
          incrementErrorMetrics('lookup', dataSet, ['test-group'], 1);
          expect(datasetCounter).toHaveBeenCalled();
          expect(reqCounter).toHaveBeenCalled();
          expect(lookUpCounter).toHaveBeenCalled();
        });
      });
    });
    describe('searches', () => {
      dataSets.forEach((dataSet) => {
        test(`${dataSet} dataset counter incremented`, () => {

          const datasetCounter = jest.spyOn(promMetrics.req[dataSet], 'inc');
          incrementErrorMetrics('search', dataSet, ['test-group'], 1);
          expect(datasetCounter).toHaveBeenCalled();
          expect(reqCounter).toHaveBeenCalled();
          expect(searchCounter).toHaveBeenCalled();
        });
      });
    });
  });

  describe('get time function', () => {
    test('date/time is represented as a number', () => {
      expect(typeof getCurrentTimeInMillis()).toBe('number');
    });
  });
});
