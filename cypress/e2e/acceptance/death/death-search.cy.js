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
        surname: 'Surname', forenames: 'forenamemorethanthirtycharacter', dobd: { day: '01', month: '10', year: '2010' }
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
        surname: 'surnamemorethanthirtycharacterlimit', forenames: 'forenamemorethanthirtycharacter', dobd: { day: '01', month: '10', year: '2010' }
      });
    });
    it('displays an error message, requests a surname, forename within 30 character limit', () => {
      DeathSearchPage.invalidSurname();
    });
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
  });
});
