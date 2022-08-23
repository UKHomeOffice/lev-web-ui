const { incrementRequestMetrics, incrementErrorMetrics, promMetrics } = require('../../lib/metrics');

describe('metric tests', () => {
  const reqTypes = ['lookup', 'search'];
  const dataSets = ['birth', 'death', 'marriage', 'partnership'];

  describe('req counter', () => {
    reqTypes.forEach(reqType => {
      describe(`${reqType} counter`, () => {
        dataSets.forEach(dataSet => {
          test(`${dataSet} dataset counter incremented`, () => {

            // Arrange
            const reqCounter = jest.spyOn(promMetrics.req, 'inc');
            const reqTypeCounter = jest.spyOn(promMetrics.req[reqType], 'inc');
            const datasetCounter = jest.spyOn(promMetrics.req[dataSet], 'inc');
            const datasetReqTypeCounter = jest.spyOn(promMetrics.req[dataSet][reqType], 'inc');

            // Act
            incrementRequestMetrics(reqType, dataSet, ['test-group'], 1);

            // Assert
            expect(reqCounter).toHaveBeenCalledTimes(1);
            expect(reqTypeCounter).toHaveBeenCalledTimes(1);
            expect(datasetCounter).toHaveBeenCalledTimes(1);
            expect(datasetReqTypeCounter).toHaveBeenCalledTimes(1);

            jest.restoreAllMocks();
          });
        });
      });
    });
  });

  describe('err counter', () => {
    reqTypes.forEach(reqType => {
      describe(`${reqType} counter`, () => {
        dataSets.forEach(dataSet => {
          test(`${dataSet} dataset counter incremented`, () => {

            // Arrange
            const reqCounter = jest.spyOn(promMetrics.err, 'inc');
            const reqTypeCounter = jest.spyOn(promMetrics.err[reqType], 'inc');
            const datasetCounter = jest.spyOn(promMetrics.err[dataSet], 'inc');
            const datasetReqTypeCounter = jest.spyOn(promMetrics.err[dataSet][reqType], 'inc');

            // Act
            incrementErrorMetrics(reqType, dataSet, ['test-group'], 1);

            // Assert
            expect(reqCounter).toHaveBeenCalledTimes(1);
            expect(reqTypeCounter).toHaveBeenCalledTimes(1);
            expect(datasetCounter).toHaveBeenCalledTimes(1);
            expect(datasetReqTypeCounter).toHaveBeenCalledTimes(1);

            jest.restoreAllMocks();
          });
        });
      });
    });
  });
});
