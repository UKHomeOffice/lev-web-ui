'use strict';

const expectedNoRecords = require('../../../fixtures/marriage/expected-no-records');
const expectedSingleRecord = require('../../../fixtures/marriage/expected-marriage-record');
const expectedMultipleRecords = require('../../../fixtures/marriage/expected-marriage-records');
const MarriageDetailsPage = require('../../../pages/marriage/MarriageDetailsPage');
const MarriageResultsPage = require('../../../pages/marriage/MarriageResultsPage');
const MarriageSearchPage = require('../../../pages/marriage/MarriageSearchPage');
const LoginPage = require('../../../pages/LoginPage');
const {DateTime} = require('luxon');

describe('Marriage search', () => {
  before(() => {
    LoginPage.login();
  });

  it('returns the search page', () => {
    MarriageSearchPage.visit();
    MarriageSearchPage.shouldBeVisible();
  });

  describe('submitting a valid query', () => {
    describe('that returns no records', () => {
      const { search } = expectedNoRecords;

      before(() => {
        MarriageSearchPage.visit();
        MarriageSearchPage.performSearch(search);
      });

      it('returns a results page', () => {
        MarriageResultsPage.shouldBeVisible();
      });

      it('displays an appropriate message', () => {
        MarriageResultsPage.hasExpectedTitle(expectedNoRecords);
      });
    });

    describe('that returns 1 record', () => {
      const { search, result } = expectedSingleRecord;

      before(() => {
        MarriageSearchPage.visit();
        MarriageSearchPage.performSearch(search);
      });

      it('redirects to a details page', () => {
        MarriageDetailsPage.shouldBeVisible();
        MarriageDetailsPage.hasExpectedTitle(result);
      });
    });

    describe('that returns more than 1 record', () => {
      const { search, results } = expectedMultipleRecords;

      before(() => {
        MarriageSearchPage.visit();
        MarriageSearchPage.performSearch(search);
      });

      it('returns a results page', () => {
        MarriageResultsPage.shouldBeVisible();
      });

      it('displays an appropriate message', () => {
        MarriageResultsPage.hasExpectedTitle(expectedMultipleRecords);
      });

      it('displays a subset of each record in a list', () => {
        MarriageResultsPage.hasExpectedResults(results);
      });

      it('contains a link back to the search screen', () => {
        MarriageResultsPage.hasNewSearchButton();
        MarriageResultsPage.hasEditSearchButton();
      });
    });
  });

  describe('submitting an invalid query', () => {
    describe('with all fields empty', () => {
      before(() => {
        MarriageSearchPage.visit();
        MarriageSearchPage.performSearch({});
      });

      it('displays an error message', () => {
        MarriageSearchPage.hasErrorTitle();
      });

      it('requests a surname', () => {
        MarriageSearchPage.hasErrorMessage('Enter last name');
      });

      it('requests a forename', () => {
        MarriageSearchPage.hasErrorMessage('Enter first name. Middle name is optional');
      });

      it('requests a date of marriage', () => {
        MarriageSearchPage.hasErrorMessage('Enter date of marriage');
      });
    });

    describe('with an entry number', () => {
      describe('of an invalid length', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.performSearch({
            entryNumber: '12345678'
          });
        });

        it('displays an error message', () => {
          MarriageSearchPage.hasErrorTitle();
        });

        it('requests an entry number of the valid length', () => {
          MarriageSearchPage.hasErrorMessage('System or entry number must contain 9 digits');
        });
      });
    });

    describe('with a missing first name', () => {
      before(() => {
        MarriageSearchPage.visit();
        MarriageSearchPage.performSearch({
          surname: 'Surname',
          dom: {
            day: '5',
            month: '6',
            year: '2010'
          }
        });
      });

      it('displays an error message', () => {
        MarriageSearchPage.hasErrorTitle();
      });

      it('requests a forename', () => {
        MarriageSearchPage.hasErrorMessage('Enter first name. Middle name is optional');
      });

      describe('and a missing surname', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.performSearch({
            dom: {
              day: '5',
              month: '6',
              year: '2010'
            }
          });
        });

        it('displays an error message', () => {
          MarriageSearchPage.hasErrorTitle();
        });

        it('requests a surname', () => {
          MarriageSearchPage.hasErrorMessage('Enter last name');
        });

        it('requests a forename', () => {
          MarriageSearchPage.hasErrorMessage('Enter first name. Middle name is optional');
        });
      });

      describe('with surname with numbers and symbols', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.performSearch({
            surname: '123@/*', forenames: 'TEST', dom: { day: '5', month: '6', year: '2010' }
          });
        });
        it('displays an error message', () => {
          MarriageSearchPage.hasErrorTitle();
        });
        it('requests a valid surname with letters only', () => {
          MarriageSearchPage.hasErrorTitle('Last name can only contain letters');
        })
      });

      describe('with forename with numbers and symbols', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: '123@/*', dom: { day: '5', month: '6', year: '2010' }
          });
        });
        it('displays an error message', () => {
          MarriageSearchPage.hasErrorTitle();
        });
        it('requests a valid forename with letters only', () => {
          MarriageSearchPage.hasErrorTitle('First and middle name can only contain letters');
        })
      });
    });
    describe('with a first name more than 30 character length', () => {
      before(() => {
        MarriageSearchPage.visit();
        MarriageSearchPage.performSearch({
          surname: 'Surname',
          forenames: 'ForenameMoreThanThirtyCharacter',
          dom: {
            day: '5',
            month: '6',
            year: '2010'
          }
        });
      });

      it('displays an error message', () => {
        MarriageSearchPage.hasErrorTitle();
      });

      it('requests a forename within 30 character limit', () => {
        MarriageSearchPage.hasErrorMessage('First and middle name must be 30 characters or less');
      });

      describe('and a surname more than 30 character length', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.performSearch({
            surname: 'SurnameMoreThanThirtyCharacterLimit',
            forenames: 'ForenameMoreThanThirtyCharacter',
            dom: {
              day: '5',
              month: '6',
              year: '2010'
            }
          });
        });

        it('displays an error message', () => {
          MarriageSearchPage.hasErrorTitle();
        });

        it('requests a surname within 30 character limit', () => {
          MarriageSearchPage.hasErrorMessage('Last name must be 30 characters or less');
        });

        it('requests a forename within 30 character limit', () => {
          MarriageSearchPage.hasErrorMessage('First and middle name must be 30 characters or less');
        });
      });
    });
    describe('with an invalid date of marriage that has an', () => {
      describe('invalid day', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: 'XX', month: '10', year: '2010' }
          });
        });
        it('displays an error message, requests a valid dom', () => {
          MarriageSearchPage.invalidDOMDay();
        });
      });
      describe('invalid month', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '01', month: 'XX', year: '2010' }
          });
        });
        it('displays an error message, requests a valid dom', () => {
          MarriageSearchPage.invalidDOMMonth();
        });
      });
      describe('invalid year', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '01', month: '01', year: 'XXXX' }
          });
        });
        it('displays an error message, requests a valid dom', () => {
          MarriageSearchPage.invalidDOMYear();
        });
      });
      describe('a date in the future', () => {
        const dateToday = DateTime.now().plus({ days: 1 });
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.performSearch({
            surname: 'McFly', forenames: 'Marty Jr',
            dom: { day: dateToday.day, month: dateToday.month, year: dateToday.year }
          });
        });
        it('displays an error message, requests a past date and shows the dom hint', () => {
          MarriageSearchPage.domInFuture();
        });
      });
      describe('invalid year length', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '01', month: '01', year: '201' }
          });
        });
        it('displays an error message, requests a valid dob of 4 digits long', () => {
          MarriageSearchPage.domYearMustHaveFourDigits();
        });
      });
      describe('invalid day range for month with 28 days', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '29', month: '02', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 28', () => {
          MarriageSearchPage.domDayOutOfRange28();
        });
      });
      describe('invalid day below range for month with 28 days', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '00', month: '02', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 28', () => {
          MarriageSearchPage.domDayOutOfRange28();
        });
      });
      describe('invalid day above range for month with 29 days', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '30', month: '02', year: '2012' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 29', () => {
          MarriageSearchPage.domDayOutOfRange29();
        });
      });
      describe('invalid day below range for month with 29 days', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '00', month: '02', year: '2012' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 29', () => {
          MarriageSearchPage.domDayOutOfRange29();
        });
      });
      describe('invalid day above range for month with 30 days', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '31', month: '04', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 30', () => {
          MarriageSearchPage.domDayOutOfRange30();
        });
      });
      describe('invalid day below range for month with 30 days', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '00', month: '04', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 30', () => {
          MarriageSearchPage.domDayOutOfRange30();
        });
      });
      describe('invalid day above range for month with 31 days', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '32', month: '01', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 31', () => {
          MarriageSearchPage.domDayOutOfRange31();
        });
      });
      describe('invalid day above range for month with 31 days', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '00', month: '01', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 31', () => {
          MarriageSearchPage.domDayOutOfRange31();
        });
      });
      describe('invalid month above range', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '10', month: '13', year: '2012' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 12', () => {
          MarriageSearchPage.domMonthOutOfRange();
        });
      });
      describe('invalid month below range', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({
            surname: 'TEST', forenames: 'TEST', dom: { day: '10', month: '00', year: '2012' }
          });
        });
        it('displays an error message, requests a valid day with the range of 1 and 12', () => {
          MarriageSearchPage.domMonthOutOfRange();
        });
      });
    });
  });
});
