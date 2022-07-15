'use strict';

const AuditSearchPage = require('../../../pages/user-activity/UserActivitySearchPage');
const LoginPage = require('../../../pages/LoginPage');
const { DateTime } = require('luxon');
const { searchRecords } = require('../../../fixtures/user-activity');

describe('User Activity', () => {
  before(() => {
    LoginPage.login();
  });
  it('returns the report page', () => {
    AuditSearchPage.visit();
    AuditSearchPage.shouldBeVisible();
  });
  it('weekend checkbox ticked by default', () => {
    AuditSearchPage.checkboxTicked(true);
  });

  describe('submitting an invalid query', () => {
    describe('with all fields empty', () => {
      before(() => {
        AuditSearchPage.visit();
        AuditSearchPage.performSearch({});
      });
      it('displays an error message', () => {
        AuditSearchPage.hasErrorTitle();
      });
      it('requests a date from', () => {
        AuditSearchPage.hasErrorMessage('Please enter a search from');
      });
      it('requests a search to', () => {
        AuditSearchPage.hasErrorMessage('Please enter a search to');
      });
    });
    describe('with wth dateFrom fields empty', () => {
      before(() => {
        AuditSearchPage.visit();
        AuditSearchPage.performSearch({ ...searchRecords, dateFrom: {} });
      });
      it('displays an error message', () => {
        AuditSearchPage.hasErrorTitle();
      });
      it('requests a search from', () => {
        AuditSearchPage.hasErrorMessage('Please enter a search from');
      });
    });
    describe('with wth dateTo fields empty', () => {
      before(() => {
        AuditSearchPage.visit();
        AuditSearchPage.performSearch({ ...searchRecords, dateTo: {} });
      });
      it('displays an error message', () => {
        AuditSearchPage.hasErrorTitle();
      });
      it('requests a search to', () => {
        AuditSearchPage.hasErrorMessage('Please enter a search to');
      });
    });
    describe('with an invalid date from that has an', () => {
      describe('invalid day', () => {
        before(() => {
          AuditSearchPage.visit();
          AuditSearchPage.shouldBeVisible();
          AuditSearchPage.performSearch({
            ...searchRecords,
            dateFrom: { day: 'XX', month: '10', year: '2010' }
          });
        });
        it('displays an error message, requests a valid day', () => {
          AuditSearchPage.invalidDay('dateFrom');
        });
      });
      describe('invalid month', () => {
        before(() => {
          AuditSearchPage.visit();
          AuditSearchPage.shouldBeVisible();
          AuditSearchPage.performSearch({
            ...searchRecords,
            dateFrom: { day: '01', month: 'XX', year: '2010' }
          });
        });
        it('displays an error message, requests a valid month', () => {
          AuditSearchPage.invalidMonth('dateFrom');
        });
      });
      describe('invalid year', () => {
        before(() => {
          AuditSearchPage.visit();
          AuditSearchPage.shouldBeVisible();
          AuditSearchPage.performSearch({
            ...searchRecords,
            dateFrom: { day: '01', month: '10', year: 'XXXX' }
          });
        });
        it('displays an error message, requests a valid year', () => {
          AuditSearchPage.invalidYear('dateFrom');
        });
      });
      describe('with an invalid date to that has an', () => {
        describe('invalid day', () => {
          before(() => {
            AuditSearchPage.visit();
            AuditSearchPage.shouldBeVisible();
            AuditSearchPage.performSearch({
              ...searchRecords,
              dateTo: { day: 'XX', month: '10', year: '2010' }
            });
          });
          it('displays an error message, requests a valid day', () => {
            AuditSearchPage.invalidDay('dateTo');
          });
        });
        describe('invalid month', () => {
          before(() => {
            AuditSearchPage.visit();
            AuditSearchPage.shouldBeVisible();
            AuditSearchPage.performSearch({
              ...searchRecords,
              dateTo: { day: '01', month: 'XX', year: '2010' }
            });
          });
          it('displays an error message, requests a valid month', () => {
            AuditSearchPage.invalidMonth('dateTo');
          });
        });
        describe('invalid year', () => {
          before(() => {
            AuditSearchPage.visit();
            AuditSearchPage.shouldBeVisible();
            AuditSearchPage.performSearch({
              ...searchRecords,
              dateTo: { day: '01', month: '10', year: 'XXXX' }
            });
          });
          it('displays an error message, requests a valid year', () => {
            AuditSearchPage.invalidYear('dateTo');
          });
        });
        describe('a date in the future', () => {
          const dateToday = DateTime.now().plus({ days: 1 });
          before(() => {
            AuditSearchPage.visit();
            AuditSearchPage.performSearch({
              ...searchRecords,
              dateTo: { day: dateToday.day, month: dateToday.month, year: dateToday.year }
            });
          });
          it('displays an error message, requests a past date and shows the date in past hint', () => {
            AuditSearchPage.dateInFuture('dateTo');
          });
        });
      });
    });
  });
});


