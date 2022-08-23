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
      dataSets.forEach(dataSet => {
        test(`${dataSet} dataset counter incremented`, () => {

          // Arrange
          const datasetCounter = jest.spyOn(promMetrics.req[dataSet], 'inc');

          // Act
          incrementRequestMetrics('lookup', dataSet, ['test-group'], 1);

          // Assert
          expect(datasetCounter).toHaveBeenCalledTimes(1);
          expect(reqCounter).toHaveBeenCalledTimes(1);
          expect(lookUpCounter).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('searches', () => {
      dataSets.forEach(dataSet => {
        test(`${dataSet} dataset counter incremented`, () => {

          // Arrange
          const datasetCounter = jest.spyOn(promMetrics.req[dataSet], 'inc');

          // Act
          incrementRequestMetrics('search', dataSet, ['test-group'], 1);

          // Assert
          expect(datasetCounter).toHaveBeenCalledTimes(1);
          expect(reqCounter).toHaveBeenCalledTimes(1);
          expect(searchCounter).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('err counter', () => {
    const reqCounter = jest.spyOn(promMetrics.err, 'inc');
    const lookUpCounter = jest.spyOn(promMetrics.err.lookup, 'inc');
    const searchCounter = jest.spyOn(promMetrics.err.search, 'inc');

    describe('lookups', () => {
      dataSets.forEach(dataSet => {
        test(`${dataSet} dataset counter incremented`, () => {

          // Arrange
          const datasetCounter = jest.spyOn(promMetrics.err[dataSet], 'inc');

          // Act
          incrementErrorMetrics('lookup', dataSet, ['test-group'], 1);

          // Assert
          expect(datasetCounter).toHaveBeenCalledTimes(1);
          expect(reqCounter).toHaveBeenCalledTimes(1);
          expect(lookUpCounter).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('searches', () => {
      dataSets.forEach(dataSet => {
        test(`${dataSet} dataset counter incremented`, () => {

          // Arrange
          const datasetCounter = jest.spyOn(promMetrics.err[dataSet], 'inc');

          // Act
          incrementErrorMetrics('search', dataSet, ['test-group'], 1);

          // Assert
          expect(datasetCounter).toHaveBeenCalledTimes(1);
          expect(reqCounter).toHaveBeenCalledTimes(1);
          expect(searchCounter).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('get time function', () => {
    test('date/time is represented as a number', () => {

      // Assert
      expect(typeof getCurrentTimeInMillis()).toBe('number');
    });
  });
});
