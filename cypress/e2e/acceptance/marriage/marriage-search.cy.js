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
        MarriageSearchPage.hasErrorMessage('Please enter a surname');
      });

      it('requests a forename', () => {
        MarriageSearchPage.hasErrorMessage('Please enter at least one forename');
      });

      it('requests a date of marriage', () => {
        MarriageSearchPage.hasErrorMessage('Please enter a date of marriage');
      });
    });

    describe('with a system number', () => {
      describe('of an invalid length', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.performSearch({
            systemNumber: '12345678'
          });
        });

        it('displays an error message', () => {
          MarriageSearchPage.hasErrorTitle();
        });

        it('requests a system number of the valid length', () => {
          MarriageSearchPage.hasErrorMessage('The system number should be 9 digits');
        });

        it('shows the system number details hint', () => {
          MarriageSearchPage.hasSystemNumberHint();
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
        MarriageSearchPage.hasErrorMessage('Please enter at least one forename');
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
          MarriageSearchPage.hasErrorMessage('Please enter a surname');
        });

        it('requests a forename', () => {
          MarriageSearchPage.hasErrorMessage('Please enter at least one forename');
        });
      });
    });
    describe('with a first name more than 30 character length', () => {
      before(() => {
        MarriageSearchPage.visit();
        MarriageSearchPage.performSearch({
          surname: 'Surname',
          forenames: 'forenamemorethanthirtycharacter',
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
        MarriageSearchPage.hasErrorMessage('Forename(s): Your entry cannot exceed 30 characters');
      });

      describe('and a surname more than 30 character length', () => {
        before(() => {
          MarriageSearchPage.visit();
          MarriageSearchPage.performSearch({
            surname: 'surnamemorethanthirtycharacterlimit',
            forenames: 'forenamemorethanthirtycharacter',
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
          MarriageSearchPage.hasErrorMessage('Surname: Your entry cannot exceed 30 characters');
        });

        it('requests a forename within 30 character limit', () => {
          MarriageSearchPage.hasErrorMessage('Forename(s): Your entry cannot exceed 30 characters');
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
    });
  });
});
