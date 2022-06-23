'use strict';

const expectedSingleRecord = require('../../../fixtures/marriage/expected-marriage-record');
const expectedMultipleRecords = require('../../../fixtures/marriage/expected-marriage-records');
const LoginPage = require('../../../pages/LoginPage');
const MarriageDetailsPage = require('../../../pages/marriage/MarriageDetailsPage');
const MarriageResultsPage = require('../../../pages/marriage/MarriageResultsPage');
const MarriageSearchPage = require('../../../pages/marriage/MarriageSearchPage');

describe('Marriage details page', () => {
  before(() => {
    LoginPage.login();
  });

  describe('When there is one result', () => {
    const { search, result } = expectedSingleRecord;

    before(() => {
      MarriageSearchPage.visit();
      MarriageSearchPage.performSearch(search);
    });

    it('returns a details page', () => {
      MarriageDetailsPage.shouldBeVisible();
    });

    it('an appropriate message is displayed', () => {
      MarriageDetailsPage.hasExpectedTitle(result);
    });

    it('a limited version is displayed in a table', () => {
      MarriageDetailsPage.hasLimitedRecord(result);
    });

    it('contains a link back to the search screen', () => {
      MarriageResultsPage.hasEditSearchButton();
    });

    it('does not contain a link back to the search results screen', () => {
      MarriageResultsPage.backToSearchResultsNotDisplayed();
    });
  });

  if (!Cypress.env('e2e')) {
    const { result } = expectedSingleRecord;
    describe('which shows the full details to select users', () => {
      before(() => {
        MarriageDetailsPage.visitWithFullDetails(result);
      });

      it('returns a details page', () => {
        MarriageDetailsPage.shouldBeVisible();
      });

      it('an appropriate message is displayed', () => {
        MarriageDetailsPage.hasExpectedTitle(result);
      });

      it('the complete record is displayed in a table', () => {
        MarriageDetailsPage.hasCompleteRecord(result);
      });

      it('contains a link back to the search screen', () => {
        MarriageResultsPage.hasEditSearchButton();
      });

      it('does not contain a link back to the search results screen', () => {
        MarriageResultsPage.backToSearchResultsNotDisplayed();
      });
    });
  }

  describe('When I select the "New search" button', () => {
    const { search } = expectedSingleRecord;

    before(() => {
      MarriageSearchPage.visit();
      MarriageSearchPage.performSearch(search);
      MarriageDetailsPage.shouldBeVisible();
      MarriageDetailsPage.clickNewSearchButton();
    });

    it('returns me to the search page', () => {
      MarriageSearchPage.shouldBeVisible();
    });

    it('has empty form values', () => {
      MarriageSearchPage.hasExpectedValues({
        systemNumber: '',
        surname: '',
        forenames: '',
        dom: {
          day: '',
          month: '',
          year: ''
        }
      });
    });
  });

  describe('When I select the "Edit search" link on the results page', () => {
    const search = {
      systemNumber: '',
      surname: 'NotRealPersonSurname',
      forenames: 'NotRealPersonForename',
      dom: {
        day: '01',
        month: '01',
        year: '2010'
      }
    };

    before(() => {
      MarriageSearchPage.visit();
      MarriageSearchPage.performSearch(search);
      MarriageResultsPage.shouldBeVisible();
      MarriageResultsPage.clickEditSearchButton();
    });

    it('returns me to the search page', () => {
      MarriageSearchPage.shouldBeVisible();
    });

    it('has the correct form values', () => {
      MarriageSearchPage.hasExpectedValues(search);
    });
  });

  describe('When I select the "Edit search" link on the details page', () => {
    const { search } = expectedSingleRecord;

    before(() => {
      MarriageSearchPage.visit();
      MarriageSearchPage.performSearch(search);
      MarriageDetailsPage.shouldBeVisible();
      MarriageDetailsPage.clickEditSearchButton();
    });

    it('returns me to the search page', () => {
      MarriageSearchPage.shouldBeVisible();
    });

    it('has the correct form values', () => {
      MarriageSearchPage.hasExpectedValues(search);
    });
  });

  describe('When I select the "Back to search results link on the details page"', () => {
    const { search, results } = expectedMultipleRecords;

    before(() => {
      MarriageSearchPage.visit();
      MarriageSearchPage.performSearch(search);
      MarriageResultsPage.shouldBeVisible();
      MarriageResultsPage.clickFirstRecord();
      MarriageDetailsPage.shouldBeVisible();
      MarriageDetailsPage.clickBackToResultsButton();
    });

    it('returns me to the results page', () => {
      MarriageResultsPage.shouldBeVisible();
    });

    it('has the correct rows', () => {
      MarriageResultsPage.hasExpectedTitle(expectedMultipleRecords);
      MarriageResultsPage.hasExpectedResults(results);
    });
  });
});
