'use strict';

const UserActivityService = require('../../../services/UserActivityService');
const searchResults = require('../fixtures/UserActivityServiceAPIResult');
const searchResultsWithFilter = require('../fixtures/UserActivityServiceAPIResultWithUserFilter.json');
const { withWeekendsResult, withoutWeekendsResult, withoutWeekendsResultWithUserFilter,
  withWeekendsResultWithUserFilter } = require('../fixtures/UserActivityServiceFixtures');

describe('UserActivityService tests', () => {
  describe('processRecord()', () => {
    describe('no user filter', () => {
      describe('including weekends', () => {
        const searchParams = { from: '2022-07-03', to: '2022-07-07' };
        it('returns a record in the correct data structure', () => {
          expect(UserActivityService.processRecord(searchResults, searchParams, true))
            .toEqual(withWeekendsResult);
        });
      });
      describe('excluding weekends', () => {
        const searchParams = { from: '2022-07-03', to: '2022-07-07' };
        it('returns a record in the correct data structure', () => {
          expect(UserActivityService.processRecord(searchResults, searchParams, false))
            .toEqual(withoutWeekendsResult);
        });
      });
    });
    describe('with user filter', () => {
      describe('including weekends', () => {
        const searchParams = { from: '2022-07-03', to: '2022-07-07', userFilter: 'Leonardo' };
        it('returns a record in the correct data structure', () => {
          expect(UserActivityService.processRecord(searchResultsWithFilter, searchParams, true))
            .toEqual(withWeekendsResultWithUserFilter);
        });
      });
      describe('excluding weekends', () => {
        const searchParams = { from: '2022-07-03', to: '2022-07-07', userFilter: 'Leonardo' };
        it('returns a record in the correct data structure', () => {
          expect(UserActivityService.processRecord(searchResultsWithFilter, searchParams, false))
            .toEqual(withoutWeekendsResultWithUserFilter);
        });
      });
    });
  });
});
