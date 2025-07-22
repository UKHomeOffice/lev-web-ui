'use strict';

const searchSingleRecord = require('../../../fixtures/death/expected-death-record');
const searchMultipleRecords = require('../../../fixtures/death/expected-death-records');
const LoginPage = require('../../../pages/LoginPage');
const DeathDetailsPage = require('../../../pages/death/DeathDetailsPage');
const DeathResultsPage = require('../../../pages/death/DeathResultsPage');
const DeathSearchPage = require('../../../pages/death/DeathSearchPage');

describe('Death details', () => {
  before(() => {
    LoginPage.login();
  });

  describe('When I perform a search that returns a single record', () => {
    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch(searchSingleRecord.search);
    });

    it('a details page should be displayed', () => {
      DeathDetailsPage.shouldBeVisible();
      DeathDetailsPage.hasExpectedTitle(searchSingleRecord.result);
      DeathDetailsPage.hasCompleteRecord(searchSingleRecord.result);
      DeathDetailsPage.newSearchButtonExists();
      DeathDetailsPage.editSearchButtonExists();
      DeathDetailsPage.backToResultsButtonNotExists();
    });
  });

  describe('When I perform a search that returns multiple records and I select the first record', () => {
    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch(searchMultipleRecords.search);
      DeathResultsPage.clickFirstRecord();
    });

    it('a details page should be displayed', () => {
      DeathDetailsPage.shouldBeVisible();
      DeathDetailsPage.hasExpectedTitle(searchMultipleRecords.results[0]);
      DeathDetailsPage.hasCompleteRecord(searchMultipleRecords.results[0]);
      DeathDetailsPage.newSearchButtonExists();
      DeathDetailsPage.editSearchButtonExists();
      DeathDetailsPage.backToResultsButtonExists();
    });

    describe('When I click the "Back to results" button', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch(searchMultipleRecords.search);
        DeathResultsPage.clickFirstRecord();
        DeathDetailsPage.clickBackToResultsButton();
      });

      it('it should display the results page', () => {
        DeathResultsPage.shouldBeVisible();
        DeathResultsPage.hasExpectedResults(searchMultipleRecords.results);
      });
    });
  });

  describe('When I perform a search that returns flagged records', () => {
    describe('and the record is blocked', () => {
      const REFERRED = 'Refer to GRO.';

      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ systemNumber: 999999971 });
      });

      it(`should display the "${REFERRED}" flag`, () => {
        DeathDetailsPage.shouldBeVisible();
        DeathDetailsPage.hasExpectedFlags([REFERRED]);
      });

      it('should not display any linked records', () => {
        DeathDetailsPage.previousRegistrationButtonNotExists();
        DeathDetailsPage.nextRegistrationButtonNotExists();
      });
    });

    describe('and the record is corrected', () => {
      const CORRECTED = 'Registration has been updated to correct an error.';

      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ systemNumber: 999999930 });
      });

      it(`should display the "${CORRECTED}" flag`, () => {
        DeathDetailsPage.shouldBeVisible();
        DeathDetailsPage.hasExpectedFlags([CORRECTED]);
      });
    });

    describe('and the record has a next registration', () => {
      const REPLACED = 'Original registration replaced by new registration.';

      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ systemNumber: 999999960 });
      });

      it(`should display the "${REPLACED}" flag`, () => {
        DeathDetailsPage.shouldBeVisible();
        DeathDetailsPage.hasExpectedFlags([REPLACED]);
      });
    });

    describe('and the record has a previous registration', () => {
      const REREGISTRATION = 'This is a reregistration.';

      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ systemNumber: 999999962 });
      });

      it(`should display the "${REREGISTRATION}" flag`, () => {
        DeathDetailsPage.shouldBeVisible();
        DeathDetailsPage.hasExpectedFlags([REREGISTRATION]);
      });
    });
  });

  describe('When I visit the death details page directly', () => {
    before(() => {
      DeathDetailsPage.visit(searchSingleRecord.result.id);
    });

    it('a details page should be displayed', () => {
      DeathDetailsPage.shouldBeVisible();
      DeathDetailsPage.hasExpectedTitle(searchSingleRecord.result);
      DeathDetailsPage.hasCompleteRecord(searchSingleRecord.result);
      DeathDetailsPage.newSearchButtonExists();
      DeathDetailsPage.editSearchButtonExists();
      DeathDetailsPage.backToResultsButtonNotExists();
    });
  });
});
