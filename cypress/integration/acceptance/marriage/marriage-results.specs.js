'use strict';

const searchMultipleRecords = require('../../../fixtures/death/expected-death-records');
const LoginPage = require('../../../pages/LoginPage');
const DeathSearchPage = require('../../../pages/death/DeathSearchPage');
const DeathResultsPage = require('../../../pages/death/DeathResultsPage');
const DeathDetailsPage = require('../../../pages/death/DeathDetailsPage');

describe('Death results', () => {
  before(() => {
    LoginPage.login();
  });

  describe('When I perform a search that returns no records', () => {
    const searchNoRecords = {
      search: { surname: 'InvalidRecord', forenames: 'Test', dobd: { day: '01', month: '01', year: '2011' } },
      results: []
    };

    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch(searchNoRecords.search);
    });

    it('a results page should be displayed', () => {
      DeathResultsPage.shouldBeVisible();
      DeathResultsPage.hasExpectedTitle(searchNoRecords);
      DeathResultsPage.newSearchButtonExists();
      DeathResultsPage.editSearchButtonExists();
    });
  });

  describe('When I perform a search that returns multiple records', () => {
    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch(searchMultipleRecords.search);
    });

    it('a results page should be displayed', () => {
      DeathResultsPage.shouldBeVisible();
      DeathResultsPage.hasExpectedTitle(searchMultipleRecords);
      DeathResultsPage.hasExpectedResults(searchMultipleRecords.results);
      DeathResultsPage.newSearchButtonExists();
      DeathResultsPage.editSearchButtonExists();
    });

    describe('When I select the first record on the results page', () => {
      before(() => {
        DeathResultsPage.clickFirstRecord();
      });

      it('a details page should be displayed', () => {
        DeathDetailsPage.shouldBeVisible();
        DeathDetailsPage.hasExpectedTitle(searchMultipleRecords.results[0]);
        DeathDetailsPage.hasLimitedRecord(searchMultipleRecords.results[0]);
      });
    });

    describe('When I select the "New search" link on the results page', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch(searchMultipleRecords.search);
        DeathResultsPage.clickNewSearchButton();
      });

      it('a search page should be displayed with no values', () => {
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.hasExpectedValues({ systemNumber: '', surname: '', forenames: '', dobd: { day: '', month: '', year: '' } });
      });
    });

    describe('When I select the "Edit search" link on the results page', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch(searchMultipleRecords.search);
        DeathResultsPage.clickEditSearchButton();
      });

      it('a search page should be displayed with the correct form values', () => {
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.hasExpectedValues(searchMultipleRecords.search);
      });
    });
  });

  describe('When I perform a search that returns flagged records', () => {
    describe('and there are referred records', () => {
      const REFERRED = 'Refer to GRO.';

      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ surname: 'Marginal', forenames: 'Tester', dobd: { day: 29, month: 2, year: 1912 } });
      });

      it('a results page should be displayed', () => {
        DeathResultsPage.shouldBeVisible();
        DeathResultsPage.hasExpectedFlags([REFERRED, REFERRED, REFERRED]);
      });
    });

    describe('and there are corrected records', () => {
      const CORRECTED = 'Registration has been updated to correct an error.';

      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ surname: 'Corrected', forenames: 'Tester', dobd: { day: 29, month: 2, year: 1912 } });
      });

      it('a results page should be displayed', () => {
        DeathResultsPage.shouldBeVisible();
        DeathResultsPage.hasExpectedFlags([CORRECTED, CORRECTED, CORRECTED]);
      });
    });

    describe('and there are replaced records', () => {
      const REPLACED = 'Original registration replaced by new registration.';

      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ surname: 'Registration', forenames: 'Tester', dobd: { day: 29, month: 2, year: 1912 } });
      });

      it('a results page should be displayed', () => {
        DeathResultsPage.shouldBeVisible();
        DeathResultsPage.hasExpectedFlags([REPLACED, REPLACED]);
      });
    });
  });
});
