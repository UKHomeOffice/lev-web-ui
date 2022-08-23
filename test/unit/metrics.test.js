const { incrementRequestMetrics, incrementErrorMetrics, promMetrics, initialiseGroupMetrics} = require('../../lib/metrics');

describe('metric tests', () => {
  const reqTypes = ['lookup', 'search'];
  const dataSets = ['birth', 'death', 'marriage', 'partnership'];
  const group = 'test-group';
  const groups = [group];
  const duration = 1000;

  initialiseGroupMetrics(groups);

  describe('req counter', () => {
    reqTypes.forEach(reqType => {
      describe(`${reqType} counter`, () => {
        dataSets.forEach(dataSet => {
          it(`${dataSet} dataset counter incremented`, () => {

            // Arrange
            const reqCounter = jest.spyOn(promMetrics.req, 'inc');
            const reqTypeCounter = jest.spyOn(promMetrics.req[reqType], 'inc');
            const datasetCounter = jest.spyOn(promMetrics.req[dataSet], 'inc');
            const datasetReqTypeCounter = jest.spyOn(promMetrics.req[dataSet][reqType], 'inc');
            const groupCounter = jest.spyOn(promMetrics.req[group], 'inc');

            const reqHistogram = jest.spyOn(promMetrics.req.time, 'observe');
            const reqTypeHistogram = jest.spyOn(promMetrics.req[reqType].time, 'observe');
            const datasetHistogram = jest.spyOn(promMetrics.req[dataSet].time, 'observe');
            const datasetReqTypeHistogram = jest.spyOn(promMetrics.req[dataSet][reqType].time, 'observe');
            const groupHistogram = jest.spyOn(promMetrics.req[group].time, 'observe');

            // Act
            incrementRequestMetrics(reqType, dataSet, groups, duration);

            // Assert
            expect(reqCounter).toHaveBeenCalledTimes(1);
            expect(reqTypeCounter).toHaveBeenCalledTimes(1);
            expect(datasetCounter).toHaveBeenCalledTimes(1);
            expect(datasetReqTypeCounter).toHaveBeenCalledTimes(1);
            expect(groupCounter).toHaveBeenCalledTimes(1);

            expect(reqHistogram).toHaveBeenCalledTimes(1);
            expect(reqTypeHistogram).toHaveBeenCalledTimes(1);
            expect(datasetHistogram).toHaveBeenCalledTimes(1);
            expect(datasetReqTypeHistogram).toHaveBeenCalledTimes(1);
            expect(groupHistogram).toHaveBeenCalledTimes(1);

            expect(reqHistogram).toHaveBeenCalledWith(duration / 1000);

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
          it(`${dataSet} dataset counter incremented`, () => {

            // Arrange
            const errCounter = jest.spyOn(promMetrics.err, 'inc');
            const reqTypeCounter = jest.spyOn(promMetrics.err[reqType], 'inc');
            const datasetCounter = jest.spyOn(promMetrics.err[dataSet], 'inc');
            const datasetReqTypeCounter = jest.spyOn(promMetrics.err[dataSet][reqType], 'inc');
            const groupCounter = jest.spyOn(promMetrics.err[group], 'inc');

            const errHistogram = jest.spyOn(promMetrics.err.time, 'observe');
            const reqTypeHistogram = jest.spyOn(promMetrics.err[reqType].time, 'observe');
            const datasetHistogram = jest.spyOn(promMetrics.err[dataSet].time, 'observe');
            const datasetReqTypeHistogram = jest.spyOn(promMetrics.err[dataSet][reqType].time, 'observe');
            const groupHistogram = jest.spyOn(promMetrics.err[group].time, 'observe');

            // Act
            incrementErrorMetrics(reqType, dataSet, groups, duration);

            // Assert
            expect(errCounter).toHaveBeenCalledTimes(1);
            expect(reqTypeCounter).toHaveBeenCalledTimes(1);
            expect(datasetCounter).toHaveBeenCalledTimes(1);
            expect(datasetReqTypeCounter).toHaveBeenCalledTimes(1);
            expect(groupCounter).toHaveBeenCalledTimes(1);

            expect(errHistogram).toHaveBeenCalledTimes(1);
            expect(reqTypeHistogram).toHaveBeenCalledTimes(1);
            expect(datasetHistogram).toHaveBeenCalledTimes(1);
            expect(datasetReqTypeHistogram).toHaveBeenCalledTimes(1);
            expect(groupHistogram).toHaveBeenCalledTimes(1);

            expect(errHistogram).toHaveBeenCalledWith(duration / 1000);

            jest.restoreAllMocks();
          });
        });
      });
    });
  });
});
