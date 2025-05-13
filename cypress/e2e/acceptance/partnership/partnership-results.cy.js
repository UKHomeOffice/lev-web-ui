'use strict';

const searchMultipleRecords = require('../../../fixtures/partnership/expected-partnership-records');
const LoginPage = require('../../../pages/LoginPage');
const PartnershipSearchPage = require('../../../pages/partnership/PartnershipSearchPage');
const PartnershipResultsPage = require('../../../pages/partnership/PartnershipResultsPage');
const PartnershipDetailsPage = require('../../../pages/partnership/PartnershipDetailsPage');
const expectedMultipleRecords = require('../../../fixtures/partnership/expected-partnership-records');

describe('Partnership results', () => {
  before(() => {
    LoginPage.login();
  });

  describe('When I perform a search that returns no records', () => {
    const searchNoRecords = {
      search: { surname: 'InvalidRecord', forenames: 'Test', dop: { day: '01', month: '01', year: '2011' }},
      results: []
    };

    before(() => {
      PartnershipSearchPage.visit();
      PartnershipSearchPage.performSearch(searchNoRecords.search);
    });

    it('a results page should be displayed', () => {
      PartnershipResultsPage.shouldBeVisible();
      PartnershipResultsPage.hasExpectedTitle(searchNoRecords);
      PartnershipResultsPage.newSearchButtonExists();
      PartnershipResultsPage.editSearchButtonExists();
    });
  });


  describe('When there is more than one result', () => {
    const { search, results } = expectedMultipleRecords;
    const result = results[0];

    before(() => {
      PartnershipSearchPage.visit();
      PartnershipSearchPage.performSearch(search);
      PartnershipResultsPage.shouldBeVisible();
      PartnershipResultsPage.clickFirstRecord();
    });

    it('returns a details page', () => {
      PartnershipDetailsPage.shouldBeVisible();
    });

    it('an appropriate message is displayed', () => {
      PartnershipDetailsPage.hasExpectedTitle(result);
    });

    it('a limited version is displayed in a table', () => {
      PartnershipDetailsPage.hasLimitedRecord(result);
    });

    it('contains a link back to the search screen', () => {
      PartnershipDetailsPage.hasEditSearchButton();
    });

    it('contains a link back to the search results screen', () => {
      PartnershipDetailsPage.backToSearchResultsLinkDisplayed();
    });
  });

  describe('When I perform a search that returns multiple records', () => {
    before(() => {
      PartnershipSearchPage.visit();
      PartnershipSearchPage.performSearch(searchMultipleRecords.search);
    });

    it('a results page should be displayed', () => {
      PartnershipResultsPage.shouldBeVisible();
      PartnershipResultsPage.hasExpectedTitle(searchMultipleRecords);
      PartnershipResultsPage.hasExpectedResults(searchMultipleRecords.results);
      PartnershipResultsPage.newSearchButtonExists();
      PartnershipResultsPage.editSearchButtonExists();
    });

    describe('When I select the first record on the results page', () => {
      before(() => {
        PartnershipResultsPage.clickFirstRecord();
      });

      it('a details page should be displayed', () => {
        PartnershipDetailsPage.shouldBeVisible();
        PartnershipDetailsPage.hasExpectedTitle(searchMultipleRecords.results[0]);
        PartnershipDetailsPage.hasLimitedRecord(searchMultipleRecords.results[0]);
      });
    });

    describe('When I select the "New search" link on the results page', () => {
      before(() => {
        PartnershipSearchPage.visit();
        PartnershipSearchPage.performSearch(searchMultipleRecords.search);
        PartnershipResultsPage.clickNewSearchButton();
      });

      it('a search page should be displayed with no values', () => {
        PartnershipSearchPage.shouldBeVisible();
        PartnershipSearchPage.hasExpectedValues({ entryNumber: '', surname: '', forenames: '', dop: { day: '', month: '', year: '' } });
      });
    });

    describe('When I select the "Edit search" link on the results page', () => {
      before(() => {
        PartnershipSearchPage.visit();
        PartnershipSearchPage.performSearch(searchMultipleRecords.search);
        PartnershipResultsPage.clickEditSearchButton();
      });

      it('a search page should be displayed with the correct form values', () => {
        PartnershipSearchPage.shouldBeVisible();
        PartnershipSearchPage.hasExpectedValues(searchMultipleRecords.search);
      });
    });
  });
});
