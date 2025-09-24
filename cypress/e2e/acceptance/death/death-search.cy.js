'use strict';

const { DateTime } = require('luxon');
const searchSingleRecord = require('../../../fixtures/death/expected-death-record');
const LoginPage = require('../../../pages/LoginPage');
const DeathSearchPage = require('../../../pages/death/DeathSearchPage');
const DeathDetailsPage = require('../../../pages/death/DeathDetailsPage');

describe('Death search', () => {
  before(() => {
    LoginPage.login();
  });
  describe('after submitting a valid query', () => {
    describe('When I select the "New search" button', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch(searchSingleRecord.search);
        DeathDetailsPage.clickNewSearchButton();

        it('shows the search page', () => {
          DeathSearchPage.shouldBeVisible();
        });
      });
      it('new search has empty values', () => {
        DeathSearchPage.hasExpectedValues({ systemNumber: '', surname: '', forenames: '', dobd: { day: '', month: '', year: '' } });
      });
    });
    describe('When I select the "Edit search" button', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch(searchSingleRecord.search);
        DeathDetailsPage.clickEditSearchButton();
      });
      it('shows the search page', () => {
        DeathSearchPage.shouldBeVisible();
      });
      it('has the correct form values', () => {
        DeathSearchPage.hasExpectedValues(searchSingleRecord.search);
      });
    });
  });
  describe('submitting an invalid query', () => {
    describe('with all fields empty', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ surname: '', forenames: '', dobd: { day: '', month: '', year: '' } });
      });
      it('displays appropriate error messages', () => {
        DeathSearchPage.noSearchCriteria();
      });
    });
  });
  describe('with a system number', () => {
    describe('of an invalid length', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ systemNumber: 12345678, surname: '', forenames: '', dobd: { day: '', month: '', year: '' } });
      });

      it('displays an error message, requests a 9 digit number and shows hint image', () => {
        DeathSearchPage.invalidLengthSystemNumber();
      });
    });
  });
  describe('with a missing first name', () => {
    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch({ surname: 'Surname', forenames: '', dobd: { day: '01', month: '10', year: '2010' } });
    });
    it('displays an error message, requests a forename', () => {
      DeathSearchPage.noForenames();
    });
  });
  describe('with a first name more than 30 character length', () => {
    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch({
        surname: 'Surname', forenames: 'ForenameMoreThanThirtyCharacter', dobd: { day: '01', month: '10', year: '2010' }
      });
    });
    it('displays an error message, requests a forename within 30 character limit', () => {
      DeathSearchPage.invalidForenames();
    });
  });
  describe('and a missing surname', () => {
    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch({ surname: '', forenames: '', dobd: { day: '01', month: '10', year: '2010' } });
    });
    it('displays an error message, requests a surname, forename', () => {
      DeathSearchPage.noSurname();
    });
  });
  describe('with a surname more than 30 character length', () => {
    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch({
        surname: 'SurnameMoreThanThirtyCharacterLimit', forenames: 'ForenameMoreThanThirtyCharacter', dobd: { day: '01', month: '10', year: '2010' }
      });
    });
    it('displays an error message, requests a surname, forename within 30 character limit', () => {
      DeathSearchPage.invalidSurname();
    });
  });
  describe('with an forename and surname with special characters and numbers', () => {
    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch({
        surname: '123@/*', forenames: '123@/*', dobd: { day: '01', month: '10', year: '2010' }
      });
    });
    it('displays an error message, surname, forename and middle name should only contain letters', () => {
      DeathSearchPage.forenameSurnameLettersOnly();
    })
  });
  describe('with an invalid date of birth or death that has an', () => {
    describe('invalid day', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: 'XX', month: '10', year: '2010' }
        });
      });
      it('displays an error message, requests a valid dob and focuses on dob field', () => {
        DeathSearchPage.invalidDay();
      });
    });
    describe('invalid month', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '01', month: 'XX', year: '2010' }
        });
      });
      it('displays an error message, requests a valid dob and focuses on dob field', () => {
        DeathSearchPage.invalidMonth();
      });
    });
    describe('invalid year', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({ surname: 'TEST', forenames: 'TEST', dobd: { day: '01', month: '01', year: 'XXXX' } });
      });
      it('displays an error message, requests a valid dob and focuses on dob field', () => {
        DeathSearchPage.invalidYear();
      });
    });
    describe('a date in the future', () => {
      const dateToday = DateTime.now().plus({ days: 1 });
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ surname: 'McFly', forenames: 'Marty Jr', dobd: { day: dateToday.day, month: dateToday.month, year: dateToday.year } });
      });
      it('displays an error message, requests a past date and shows the dob hint', () => {
        DeathSearchPage.dateInFuture();
      });
    });
    describe('invalid year length', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '01', month: '01', year: '201' }
        });
      });
      it('displays an error message, requests a valid dob of 4 digits long', () => {
        DeathSearchPage.dobdYearMustHaveFourDigits();
      });
    });
    describe('invalid day range for month with 28 days', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '29', month: '02', year: '2010' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 28', () => {
        DeathSearchPage.dobdDayOutOfRange28();
      });
    });
    describe('invalid day below range for month with 28 days', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '00', month: '02', year: '2010' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 28', () => {
        DeathSearchPage.dobdDayOutOfRange28();
      });
    });
    describe('invalid day above range for month with 29 days', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '30', month: '02', year: '2012' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 29', () => {
        DeathSearchPage.dobdDayOutOfRange29();
      });
    });
    describe('invalid day below range for month with 29 days', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '00', month: '02', year: '2012' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 29', () => {
        DeathSearchPage.dobdDayOutOfRange29();
      });
    });
    describe('invalid day above range for month with 30 days', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '31', month: '04', year: '2010' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 30', () => {
        DeathSearchPage.dobdDayOutOfRange30();
      });
    });
    describe('invalid day below range for month with 30 days', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '00', month: '04', year: '2010' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 30', () => {
        DeathSearchPage.dobdDayOutOfRange30();
      });
    });
    describe('invalid day above range for month with 31 days', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '32', month: '01', year: '2010' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 31', () => {
        DeathSearchPage.dobdDayOutOfRange31();
      });
    });
    describe('invalid day above range for month with 31 days', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '00', month: '01', year: '2010' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 31', () => {
        DeathSearchPage.dobdDayOutOfRange31();
      });
    });
    describe('invalid month above range', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '10', month: '13', year: '2012' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 12', () => {
        DeathSearchPage.dobdMonthOutOfRange();
      });
    });
    describe('invalid month below range', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.shouldBeVisible();
        DeathSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', dobd: { day: '10', month: '00', year: '2012' }
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 12', () => {
        DeathSearchPage.dobdMonthOutOfRange();
      });
    });
  });
});
