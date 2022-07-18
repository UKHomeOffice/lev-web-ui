'use strict';

const AuditSearchPage = require('../../../pages/user-activity/UserActivitySearchPage');
const AuditResultsPage = require('../../../pages/user-activity/UserActivityResultsPage');
const LoginPage = require('../../../pages/LoginPage');
const { DateTime } = require('luxon');
const { searchMultipleRecords, searchNoRecord, expectedSearchResult } = require('../../../fixtures/user-activity');

describe('User Activity', () => {
  const searchUser = Cypress.env('e2e') ? expectedSearchResult.e2e_user : 'lev-e2e-tests';
  before(() => {
    LoginPage.login();
  });
  it('returns the report page', () => {
    AuditSearchPage.visit();
    AuditSearchPage.shouldBeVisible();
  });

  describe('submitting valid search dates with no user filtering', () => {
    describe('returning no audit data', () => {
      before(() => {
        AuditSearchPage.visit();
        AuditSearchPage.performSearch(searchNoRecord);
      });
      it('shows the User Activity results page', () => {
        AuditResultsPage.shouldBeVisible();
      });
      it('displays an appropriate message advising no data could be found', () => {
        AuditResultsPage.noRecordsFound(searchNoRecord);
      });
    });

    describe('returning audit data', () => {
      // sets a 7-day report for testing
      const days = 7;
      const dateInPast = DateTime.now().minus({ days });
      const from = Cypress.env('e2e') ? {
        day: dateInPast.day,
        month: dateInPast.month,
        year: dateInPast.year
      } : { day: '23', month: '12', year: '2016' };
      const searchToDate = DateTime.now().minus({ days: 1 });
      const to = Cypress.env('e2e') ? {
        day: searchToDate.day,
        month: searchToDate.month,
        year: searchToDate.year
      } : { day: '29', month: '12', year: '2016' };

      before(() => {
        AuditSearchPage.visit();
        AuditSearchPage.performSearch({ dateFrom: from, dateTo: to });
      });

      it('shows the User Activity results page', () => {
        AuditResultsPage.shouldBeVisible();
      });

      it('displays an appropriate message including the search dates', () => {
        AuditResultsPage.recordsFound({ dateFrom: from, dateTo: to, user: searchUser });
      });

      it('a new search button exists', () => {
        AuditResultsPage.hasNewSearchButton();
      });
      it('and edit search button exists', () => {
        AuditResultsPage.hasEditSearchButton();
      });
      it('a back to search link exists', () => {
        AuditResultsPage.backToSearchResultsDisplayed();
      });
      it('a download to csv button exists', () => {
        AuditResultsPage.exportCSVDisplayed();
      });

      describe('displays a table with search counts for each user', () => {
        before(() => {
          AuditSearchPage.visit();
          AuditSearchPage.performSearch({ dateFrom: from, dateTo: to });
        });

        it('the username should be displayed in the row of users', () => {
          AuditResultsPage.userDisplayed(searchUser);
        });
        it('each row should have a column for each day plus a search count', () => {
          AuditResultsPage.columnForEachDayWithCount(days + 1);
        });
        describe('the last row of the table shows the daily total count for all users', () => {
          const search = Cypress.env('e2e') ? { dateFrom: from, dateTo: to } : searchMultipleRecords;

          before(() => {
            AuditSearchPage.visit();
            AuditSearchPage.performSearch(search);
          });
          it('the row should be labeled "Day totals"', () => {
            AuditResultsPage.lastRowDayTotals();
          });
          it('the day totals should be accurate', () => {
            AuditResultsPage.dayTotalsAccurate();
          });
          it('the period totals should be accurate for a user', () => {
            AuditResultsPage.periodTotalsAccurate();
          });
        });
      });
    });

  });
  describe('submitting valid search dates with user filtering', () => {
    describe('returning no audit data', () => {
      before(() => {
        AuditSearchPage.visit();
        AuditSearchPage.performSearch({ ...searchNoRecord, userFilter: 'userwithnosearches' });
      });
      it('shows the User Activity results page', () => {
        AuditResultsPage.shouldBeVisible();
      });
      it('displays an appropriate message advising no data could be found', () => {
        AuditResultsPage.noRecordsFound({ ...searchNoRecord, userFilter: 'userwithnosearches' });
      });
    });
  });
  describe('returning audit data', () => {
    const dateInPast = DateTime.now().minus({ days: 3 });
    const from = Cypress.env('e2e') ? {
      day: dateInPast.day,
      month: dateInPast.month,
      year: dateInPast.year
    } : { day: '24', month: '12', year: '2016' };
    const dateToday = DateTime.now();
    const to = Cypress.env('e2e') ? {
      day: dateToday.day,
      month: dateToday.month,
      year: dateToday.year
    } : { day: '30', month: '12', year: '2016' };

    before(() => {
      AuditSearchPage.visit();
      AuditSearchPage.performSearch({ dateFrom: from, dateTo: to, userFilter: searchUser });
    });
    it('shows the User Activity report page', () => {
      AuditResultsPage.shouldBeVisible();
    });
    it('displays an appropriate message including the user filter value', () => {
      AuditResultsPage.recordsFound({ dateFrom: from, dateTo: to, userFilter: searchUser });
    });
    it('shows only two rows only', () => {
      AuditResultsPage.singleRecordDisplayed();
    });
    it('with a row for the user', () => {
      AuditResultsPage.userDisplayed(searchUser);
    });
  });
});
