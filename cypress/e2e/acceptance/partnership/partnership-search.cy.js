'use strict';

const expectedNoRecords = require('../../../fixtures/partnership/expected-no-records');
const expectedSingleRecord = require('../../../fixtures/partnership/expected-partnership-record');
const expectedMultipleRecords = require('../../../fixtures/partnership/expected-partnership-records');
const PartnershipDetailsPage = require('../../../pages/partnership/PartnershipDetailsPage');
const PartnershipResultsPage = require('../../../pages/partnership/PartnershipResultsPage');
const PartnershipSearchPage = require('../../../pages/partnership/PartnershipSearchPage');
const LoginPage = require('../../../pages/LoginPage');
const {DateTime} = require('luxon');

describe('Partnership search', () => {
  before(() => {
    LoginPage.login();
  });

  it('returns the search page', () => {
    PartnershipSearchPage.visit();
    PartnershipSearchPage.shouldBeVisible();
  });

  describe('submitting a valid query', () => {
    describe('that returns no records', () => {
      const { search } = expectedNoRecords;

      before(() => {
        PartnershipSearchPage.visit();
        PartnershipSearchPage.performSearch(search);
      });

      it('returns a results page', () => {
        PartnershipResultsPage.shouldBeVisible();
      });

      it('displays an appropriate message', () => {
        PartnershipResultsPage.hasExpectedTitle(expectedNoRecords);
      });
    });

    describe('that returns 1 record', () => {
      const { search, result } = expectedSingleRecord;

      before(() => {
        PartnershipSearchPage.visit();
        PartnershipSearchPage.performSearch(search);
      });

      it('redirects to a details page', () => {
        PartnershipDetailsPage.shouldBeVisible();
        PartnershipDetailsPage.hasExpectedTitle(result);
      });
    });

    describe('that returns more than 1 record', () => {
      const { search, results } = expectedMultipleRecords;

      before(() => {
        PartnershipSearchPage.visit();
        PartnershipSearchPage.performSearch(search);
      });

      it('returns a results page', () => {
        PartnershipResultsPage.shouldBeVisible();
      });

      it('displays an appropriate message', () => {
        PartnershipResultsPage.hasExpectedTitle(expectedMultipleRecords);
      });

      it('displays a subset of each record in a list', () => {
        PartnershipResultsPage.hasExpectedResults(results);
      });

      it('contains a link back to the search screen', () => {
        PartnershipResultsPage.hasNewSearchButton();
        PartnershipResultsPage.hasEditSearchButton();
      });
    });
  });

  describe('submitting an invalid query', () => {
    describe('with all fields empty', () => {
      before(() => {
        PartnershipSearchPage.visit();
        PartnershipSearchPage.performSearch({});
      });

      it('displays an error message', () => {
        PartnershipSearchPage.hasErrorTitle();
      });

      it('requests a surname', () => {
        PartnershipSearchPage.hasErrorMessage('Please enter a surname');
      });

      it('requests a forename', () => {
        PartnershipSearchPage.hasErrorMessage('Please enter at least one forename');
      });

      it('requests a date of civil partnership', () => {
        PartnershipSearchPage.hasErrorMessage('Please enter a date of civil partnership');
      });
    });

    describe('with an entry number', () => {
      describe('of an invalid length', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.performSearch({
            entryNumber: '12345678'
          });
        });

        it('displays an error message', () => {
          PartnershipSearchPage.hasErrorTitle();
        });

        it('requests an entry number of the valid length', () => {
          PartnershipSearchPage.hasErrorMessage('The entry number should be 9 digits');
        });

        it('shows the entry number details hint', () => {
          PartnershipSearchPage.hasEntryNumberHint();
        });
      });
    });

    describe('with a missing first name', () => {
      before(() => {
        PartnershipSearchPage.visit();
        PartnershipSearchPage.performSearch({
          surname: 'Surname',
          dop: {
            day: '5',
            month: '6',
            year: '2010'
          }
        });
      });

      it('displays an error message', () => {
        PartnershipSearchPage.hasErrorTitle();
      });

      it('requests a forename', () => {
        PartnershipSearchPage.hasErrorMessage('Please enter at least one forename');
      });

      describe('and a missing surname', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.performSearch({
            dop: {
              day: '5',
              month: '6',
              year: '2010'
            }
          });
        });

        it('displays an error message', () => {
          PartnershipSearchPage.hasErrorTitle();
        });

        it('requests a surname', () => {
          PartnershipSearchPage.hasErrorMessage('Please enter a surname');
        });

        it('requests a forename', () => {
          PartnershipSearchPage.hasErrorMessage('Please enter at least one forename');
        });
      });
    });
    describe('with a first name more than 30 character length', () => {
      before(() => {
        PartnershipSearchPage.visit();
        PartnershipSearchPage.performSearch({
          surname: 'Surname',
          forenames: 'ForenameMoreThanThirtyCharacter',
          dop: {
            day: '5',
            month: '6',
            year: '2010'
          }
        });
      });

      it('displays an error message', () => {
        PartnershipSearchPage.hasErrorTitle();
      });

      it('requests a forename within 30 character limit', () => {
        PartnershipSearchPage.hasErrorMessage('Forename(s): Your entry cannot exceed 30 characters');
      });

      describe('and a surname more than 30 character length ', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.performSearch({
            surname: 'SurnameMoreThanThirtyCharacterLimit',
            forenames: 'ForenameMoreThanThirtyCharacter',
            dop: {
              day: '5',
              month: '6',
              year: '2010'
            }
          });
        });

        it('displays an error message', () => {
          PartnershipSearchPage.hasErrorTitle();
        });

        it('requests a surname within 30 character limit', () => {
          PartnershipSearchPage.hasErrorMessage('Surname: Your entry cannot exceed 30 characters');
        });

        it('requests a forename within 30 character limit', () => {
          PartnershipSearchPage.hasErrorMessage('Forename(s): Your entry cannot exceed 30 characters');
        });
      });
    });
    describe('with an invalid date of partnership that has an', () => {
      describe('invalid day', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: 'XX', month: '10', year: '2010' }
          });
        });
        it('displays an error message, requests a valid dop', () => {
          PartnershipSearchPage.invalidDOPDay();
        });
      });
      describe('invalid month', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '01', month: 'XX', year: '2010' }
          });
        });
        it('displays an error message, requests a valid dop', () => {
          PartnershipSearchPage.invalidDOPMonth();
        });
      });
      describe('invalid year', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '01', month: '01', year: 'XXXX' }
          });
        });
        it('displays an error message, requests a valid dop', () => {
          PartnershipSearchPage.invalidDOPYear();
        });
      });
      describe('a date in the future', () => {
        const dateToday = DateTime.now().plus({ days: 1 });
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.performSearch({
            surname: 'McFly', forenames: 'Marty Jr',
            dop: { day: dateToday.day, month: dateToday.month, year: dateToday.year }
          });
        });
        it('displays an error message, requests a past date and shows the dop hint', () => {
          PartnershipSearchPage.dopInFuture();
        });
      });
    });
  });
});
