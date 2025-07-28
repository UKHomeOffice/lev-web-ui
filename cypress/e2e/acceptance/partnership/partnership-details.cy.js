'use strict';

const expectedSingleRecord = require('../../../fixtures/partnership/expected-partnership-record');
const expectedMultipleRecords = require('../../../fixtures/partnership/expected-partnership-records');
const LoginPage = require('../../../pages/LoginPage');
const PartnershipDetailsPage = require('../../../pages/partnership/PartnershipDetailsPage');
const PartnershipResultsPage = require('../../../pages/partnership/PartnershipResultsPage');
const PartnershipSearchPage = require('../../../pages/partnership/PartnershipSearchPage');

describe('Partnership details page', () => {
  before(() => {
    LoginPage.login();
  });

  describe('When there is one result', () => {
    const { search, result } = expectedSingleRecord;

    before(() => {
      PartnershipSearchPage.visit();
      PartnershipSearchPage.performSearch(search);
    });

    it('returns a details page', () => {
      PartnershipDetailsPage.shouldBeVisible();
    });

    it('an appropriate message is displayed', () => {
      PartnershipDetailsPage.hasExpectedTitle(result);
    });

    it('a limited version is displayed in a table', () => {
      PartnershipDetailsPage.hasCompleteRecord(result);
    });

    it('contains a link back to the search screen', () => {
      PartnershipResultsPage.hasEditSearchButton();
    });

    it('does not contain a link back to the search results screen', () => {
      PartnershipResultsPage.backToSearchResultsNotDisplayed();
    });
  });

  describe('When I select the "New search" button', () => {
    const { search } = expectedSingleRecord;

    before(() => {
      PartnershipSearchPage.visit();
      PartnershipSearchPage.performSearch(search);
      PartnershipDetailsPage.shouldBeVisible();
      PartnershipDetailsPage.clickNewSearchButton();
    });

    it('returns me to the search page', () => {
      PartnershipSearchPage.shouldBeVisible();
    });

    it('has empty form values', () => {
      PartnershipSearchPage.hasExpectedValues({
        entryNumber: '',
        surname: '',
        forenames: '',
        dop: {
          day: '',
          month: '',
          year: ''
        }
      });
    });
  });

  describe('When I select the "Edit search" link on the results page', () => {
    const search = {
      entryNumber: '',
      surname: 'NotRealPersonSurname',
      forenames: 'NotRealPersonForename',
      dop: {
        day: '01',
        month: '01',
        year: '2010'
      }
    };

    before(() => {
      PartnershipSearchPage.visit();
      PartnershipSearchPage.performSearch(search);
      PartnershipResultsPage.shouldBeVisible();
      PartnershipResultsPage.clickEditSearchButton();
    });

    it('returns me to the search page', () => {
      PartnershipSearchPage.shouldBeVisible();
    });

    it('has the correct form values', () => {
      PartnershipSearchPage.hasExpectedValues(search);
    });
  });

  describe('When I select the "Edit search" link on the details page', () => {
    const { search } = expectedSingleRecord;

    before(() => {
      PartnershipSearchPage.visit();
      PartnershipSearchPage.performSearch(search);
      PartnershipDetailsPage.shouldBeVisible();
      PartnershipDetailsPage.clickEditSearchButton();
    });

    it('returns me to the search page', () => {
      PartnershipSearchPage.shouldBeVisible();
    });

    it('has the correct form values', () => {
      PartnershipSearchPage.hasExpectedValues(search);
    });
  });

  describe('When I select the "Back to search results link on the details page"', () => {
    const { search, results } = expectedMultipleRecords;

    before(() => {
      PartnershipSearchPage.visit();
      PartnershipSearchPage.performSearch(search);
      PartnershipResultsPage.shouldBeVisible();
      PartnershipResultsPage.clickFirstRecord();
      PartnershipDetailsPage.shouldBeVisible();
      PartnershipDetailsPage.clickBackToResultsButton();
    });

    it('returns me to the results page', () => {
      PartnershipResultsPage.shouldBeVisible();
    });

    it('has the correct rows', () => {
      PartnershipResultsPage.hasExpectedTitle(expectedMultipleRecords);
      PartnershipResultsPage.hasExpectedResults(results);
    });
  });

  describe('When I perform a search that returns flagged records', () => {
    describe('and the record is blocked', () => {
      const REFERRED = 'Refer to GRO.';

      before(() => {
        PartnershipSearchPage.visit();
        PartnershipSearchPage.performSearch({ entryNumber: 999999971 });
      });

      it(`should display the "${REFERRED}" flag`, () => {
        PartnershipDetailsPage.shouldBeVisible();
        PartnershipDetailsPage.hasExpectedFlags([REFERRED]);
      });

      it('should not display any linked records', () => {
        PartnershipDetailsPage.previousRegistrationButtonNotExists();
        PartnershipDetailsPage.nextRegistrationButtonNotExists();
      });
    });
  });
});
