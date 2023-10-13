'use strict';

const LoginPage = require('../../../pages/LoginPage');
const BirthSearchPage = require('../../../pages/birth/BirthSearchPage');
const { DateTime } = require('luxon');
const { searchSingleRecord } = require('../../../fixtures/birth/birth');
const BirthDetailsPage = require('../../../pages/birth/BirthDetailsPage');

describe('Birth search', () => {
  before(() => {
    LoginPage.login();
  });
  describe('after submitting a valid query', () => {
    describe('When I select the "New search" button', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch(searchSingleRecord);
        BirthDetailsPage.clickNewSearchButton();

        it('shows the search page', () => {
          BirthSearchPage.shouldBeVisible();
        });
      });
      it('new search has empty values', () => {
        BirthSearchPage.searchFormClear();
      });
    });
    describe('When I select the "Edit search" button', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch(searchSingleRecord);
        BirthDetailsPage.clickEditSearchButton();
      });
      it('shows the search page', () => {
        BirthSearchPage.shouldBeVisible();
      });
      it('has the correct form values', () => {
        BirthSearchPage.searchFormRetainedValues(searchSingleRecord);
      });
    });
  });
  describe('submitting an invalid query', () => {
    describe('with all fields empty', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({ surname: '', forenames: '',
          day: '', month: '', year: '' });
      });
      it('displays appropriate error messages', () => {
        BirthSearchPage.noSearchCriteria();
      });
    });
  });
  describe('with a system number', () => {
    describe('of an invalid length', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({
          systemNumber: 12345678, surname: '', forenames: '', day: '', month: '', year: ''
        });
      });

      it('displays an error message, requests a 9 digit number and shows hint image', () => {
        BirthSearchPage.invalidLengthSystemNumber();
      });
    });
  });
  describe('with a missing first name', () => {
    before(() => {
      BirthSearchPage.visit();
      BirthSearchPage.performSearch({
        surname: 'Surname', forenames: '', day: '01', month: '10', year: '2010'
      });
    });
    it('displays an error message, requests a forename', () => {
      BirthSearchPage.noForenames();
    });
  });
  describe('with a first name more than 30 character length', () => {
    before(() => {
      BirthSearchPage.visit();
      BirthSearchPage.performSearch({
        surname: 'Surname', forenames: 'forenamemorethanthirtycharacter', day: '01', month: '10', year: '2010'
      });
    });
    it('displays an error message, requests a forename within 30 character limit', () => {
      BirthSearchPage.invalidForenames();
    });
  });
  describe('and a missing surname', () => {
    before(() => {
      BirthSearchPage.visit();
      BirthSearchPage.performSearch({
        surname: '', forenames: '', day: '01', month: '10', year: '2010'
      });
    });
    it('displays an error message, requests a surname, forename', () => {
      BirthSearchPage.noSurname();
    });
  });
  describe('with a surname more than 30 character length', () => {
    before(() => {
      BirthSearchPage.visit();
      BirthSearchPage.performSearch({
        surname: 'surnamemorethanthirtycharacterlimit', forenames: 'forenamemorethanthirtycharacter', day: '01', month: '10', year: '2010'
      });
    });
    it('displays an error message, requests a surname, forename within 30 character limit', () => {
      BirthSearchPage.invalidSurname();
    });
  });
  describe('with an invalid date of birth that has an', () => {
    describe('invalid day', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: 'XX', month: '10', year: '2010'
        });
      });
      it('displays an error message, requests a valid dob and focuses on dob field', () => {
        BirthSearchPage.invalidDOBDay();
      });
    });
    describe('invalid month', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '01', month: 'XX', year: '2010'
        });
      });
      it('displays an error message, requests a valid dob and focuses on dob field', () => {
        BirthSearchPage.invalidDOBMonth();
      });
    });
    describe('invalid year', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '01', month: '01', year: 'XXXX'
        });
      });
      it('displays an error message, requests a valid dob and focuses on dob field', () => {
        BirthSearchPage.invalidDOBYear();
      });
    });
    describe('a date in the future', () => {
      const dateToday = DateTime.now().plus({ days: 1 });
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({
          surname: 'McFly', forenames: 'Marty Jr',
          day: dateToday.day, month: dateToday.month, year: dateToday.year
        });
      });
      it('displays an error message, requests a past date and shows the dob hint', () => {
        BirthSearchPage.dobInFuture();
      });
    });
    describe('a date before records began (01/07/2009)', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({
          surname: 'McFly', forenames: 'Marty',
          day: '12', month: '11', year: '1955'
        });
      });
      it('displays an error message and shows dob hint', () => {
        BirthSearchPage.dobBeforeRecordsBegan();
      });
    });
  });
});
