'use strict';

const searchMultipleRecords = require('../../../fixtures/marriage/expected-marriage-records');
const LoginPage = require('../../../pages/LoginPage');
const MarriageSearchPage = require('../../../pages/marriage/MarriageSearchPage');
const MarriageResultsPage = require('../../../pages/marriage/MarriageResultsPage');
const MarriageDetailsPage = require('../../../pages/marriage/MarriageDetailsPage');
const expectedMultipleRecords = require('../../../fixtures/marriage/expected-marriage-records');

describe('Marriage results', () => {
  before(() => {
    LoginPage.login();
  });

  describe('When I perform a search that returns no records', () => {
    const searchNoRecords = {
      search: { surname: 'InvalidRecord', forenames: 'Test', day: '01', month: '01', year: '2011' },
      results: []
    };

    before(() => {
      MarriageSearchPage.visit();
      MarriageSearchPage.performSearch(searchNoRecords.search);
    });

    it('a results page should be displayed', () => {
      MarriageResultsPage.shouldBeVisible();
      MarriageResultsPage.hasExpectedTitle(searchNoRecords);
      MarriageResultsPage.newSearchButtonExists();
      MarriageResultsPage.editSearchButtonExists();
    });
  });


  describe('When there is more than one result', () => {
    const { search, results } = expectedMultipleRecords;
    const result = results[0];

    before(() => {
      MarriageSearchPage.visit();
      MarriageSearchPage.performSearch(search);
      MarriageResultsPage.shouldBeVisible();
      MarriageResultsPage.clickFirstRecord();
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
      MarriageDetailsPage.hasEditSearchButton();
    });

    it('contains a link back to the search results screen', () => {
      MarriageDetailsPage.backToSearchResultsLinkDisplayed();
    });
  });

  describe('When I perform a search that returns multiple records', () => {
    before(() => {
      MarriageSearchPage.visit();
      MarriageSearchPage.performSearch(searchMultipleRecords.search);
    });

    it('a results page should be displayed', () => {
      MarriageResultsPage.shouldBeVisible();
      MarriageResultsPage.hasExpectedTitle(searchMultipleRecords);
      MarriageResultsPage.hasExpectedResults(searchMultipleRecords.results);
      MarriageResultsPage.newSearchButtonExists();
      MarriageResultsPage.editSearchButtonExists();
    });

    describe('When I select the first record on the results page', () => {
      before(() => {
        MarriageResultsPage.clickFirstRecord();
      });

      it('a details page should be displayed', () => {
        MarriageDetailsPage.shouldBeVisible();
        MarriageDetailsPage.hasExpectedTitle(searchMultipleRecords.results[0]);
        MarriageDetailsPage.hasLimitedRecord(searchMultipleRecords.results[0]);
      });
    });

    describe('When I select the "New search" link on the results page', () => {
      before(() => {
        MarriageSearchPage.visit();
        MarriageSearchPage.performSearch(searchMultipleRecords.search);
        MarriageResultsPage.clickNewSearchButton();
      });

      it('a search page should be displayed with no values', () => {
        MarriageSearchPage.shouldBeVisible();
        MarriageSearchPage.hasExpectedValues({ systemNumber: '', surname: '', forenames: '', dobd: { day: '', month: '', year: '' } });
      });
    });

    describe('When I select the "Edit search" link on the results page', () => {
      before(() => {
        MarriageSearchPage.visit();
        MarriageSearchPage.performSearch(searchMultipleRecords.search);
        MarriageResultsPage.clickEditSearchButton();
      });

      it('a search page should be displayed with the correct form values', () => {
        MarriageSearchPage.shouldBeVisible();
        MarriageSearchPage.hasExpectedValues(searchMultipleRecords.search);
      });
    });
  });
});
