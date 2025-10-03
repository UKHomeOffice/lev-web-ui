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
        PartnershipSearchPage.hasErrorMessage('Enter last name');
      });

      it('requests a forename', () => {
        PartnershipSearchPage.hasErrorMessage('Enter first name. Middle name is optional');
      });

      it('requests a date of civil partnership', () => {
        PartnershipSearchPage.hasErrorMessage('Enter date of civil partnership');
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
          PartnershipSearchPage.hasErrorMessage('Entry number must contain 9 digits');
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
        PartnershipSearchPage.hasErrorMessage('Enter first name. Middle name is optional');
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
          PartnershipSearchPage.hasErrorMessage('Enter last name');
        });

        it('requests a forename', () => {
          PartnershipSearchPage.hasErrorMessage('Enter first name. Middle name is optional');
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
        PartnershipSearchPage.hasErrorMessage('First and middle name must be 30 characters or less');
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
          PartnershipSearchPage.hasErrorMessage('Last name must be 30 characters or less');
        });

        it('requests a forename within 30 character limit', () => {
          PartnershipSearchPage.hasErrorMessage('First and middle name must be 30 characters or less');
        });
      });

      describe('with surname with numbers and symbols', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.performSearch({
            surname: '123@/*', forenames: 'TEST', dom: { day: '5', month: '6', year: '2010' }
          });
        });
        it('displays an error message', () => {
          PartnershipSearchPage.hasErrorTitle();
        });
        it('requests a valid surname with letters only', () => {
          PartnershipSearchPage.hasErrorTitle('Last name can only contain letters');
        })
      });

      describe('with forename with numbers and symbols', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: '123@/*', dom: { day: '5', month: '6', year: '2010' }
          });
        });
        it('displays an error message', () => {
          PartnershipSearchPage.hasErrorTitle();
        });
        it('requests a valid forename with letters only', () => {
          PartnershipSearchPage.hasErrorTitle('First and middle name can only contain letters');
        })
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
      describe('invalid year length', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '01', month: '01', year: '201' }
          });
        });
        it('displays an error message, requests a valid dob of 4 digits long', () => {
          PartnershipSearchPage.dopYearMustHaveFourDigits();
        });
      });
      describe('invalid day range for month with 28 days', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '29', month: '02', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 28', () => {
          PartnershipSearchPage.dopDayOutOfRange28();
        });
      });
      describe('invalid day below range for month with 28 days', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '00', month: '02', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 28', () => {
          PartnershipSearchPage.dopDayOutOfRange28();
        });
      });
      describe('invalid day above range for month with 29 days', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '30', month: '02', year: '2012' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 29', () => {
          PartnershipSearchPage.dopDayOutOfRange29();
        });
      });
      describe('invalid day below range for month with 29 days', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '00', month: '02', year: '2012' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 29', () => {
          PartnershipSearchPage.dopDayOutOfRange29();
        });
      });
      describe('invalid day above range for month with 30 days', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '31', month: '04', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 30', () => {
          PartnershipSearchPage.dopDayOutOfRange30();
        });
      });
      describe('invalid day below range for month with 30 days', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '00', month: '04', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 30', () => {
          PartnershipSearchPage.dopDayOutOfRange30();
        });
      });
      describe('invalid day above range for month with 31 days', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '32', month: '01', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 31', () => {
          PartnershipSearchPage.dopDayOutOfRange31();
        });
      });
      describe('invalid day above range for month with 31 days', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '00', month: '01', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 31', () => {
          PartnershipSearchPage.dopDayOutOfRange31();
        });
      });
      describe('invalid month above range', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '10', month: '13', year: '2012' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 12', () => {
          PartnershipSearchPage.dopMonthOutOfRange();
        });
      });
      describe('invalid month below range', () => {
        before(() => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dop: { day: '10', month: '00', year: '2012' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 12', () => {
          PartnershipSearchPage.dopMonthOutOfRange();
        });
      });
    });
  });
});
