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
        surname: 'Surname', forenames: 'ForenameMoreThanThirtyCharacter', day: '01', month: '10', year: '2010'
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
        surname: 'SurnameMoreThanThirtyCharacterLimit', forenames: 'ForenameMoreThanThirtyCharacter', day: '01', month: '10', year: '2010'
      });
    });
    it('displays an error message, requests a surname, forename within 30 character limit', () => {
      BirthSearchPage.invalidSurname();
    });
  });
  describe('with an forename and surname with special characters and numbers', () => {
    before(() => {
      BirthSearchPage.visit();
      BirthSearchPage.performSearch({
        surname: '123@/*', forenames: '123@/*', day: '01', month: '10', year: '2010'
      });
    });
    it('displays an error message, surname, forename and middle name should only contain letters', () => {
      BirthSearchPage.forenameSurnameLettersOnly();
    })
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
    describe('invalid year length', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '01', month: '01', year: '201'
        });
      });
      it('displays an error message, requests a valid dob of 4 digits long', () => {
        BirthSearchPage.dobYearMustHaveFourDigits();
      });
    });
    describe('invalid day range for month with 28 days', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '29', month: '02', year: '2010'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 28', () => {
        BirthSearchPage.dobDayOutOfRange28();
      });
    });
    describe('invalid day below range for month with 28 days', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '00', month: '02', year: '2010'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 28', () => {
        BirthSearchPage.dobDayOutOfRange28();
      });
    });
    describe('invalid day above range for month with 29 days', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '30', month: '02', year: '2012'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 29', () => {
        BirthSearchPage.dobDayOutOfRange29();
      });
    });
    describe('invalid day below range for month with 29 days', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '00', month: '02', year: '2012'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 29', () => {
        BirthSearchPage.dobDayOutOfRange29();
      });
    });
    describe('invalid day above range for month with 30 days', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '31', month: '04', year: '2010'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 30', () => {
        BirthSearchPage.dobDayOutOfRange30();
      });
    });
    describe('invalid day below range for month with 30 days', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '00', month: '04', year: '2010'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 30', () => {
        BirthSearchPage.dobDayOutOfRange30();
      });
    });
    describe('invalid day above range for month with 31 days', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '32', month: '01', year: '2010'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 31', () => {
        BirthSearchPage.dobDayOutOfRange31();
      });
    });
    describe('invalid day above range for month with 31 days', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '00', month: '01', year: '2010'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 31', () => {
        BirthSearchPage.dobDayOutOfRange31();
      });
    });
    describe('invalid month above range', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '10', month: '13', year: '2012'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 12', () => {
        BirthSearchPage.dobMonthOutOfRange();
      });
    });
    describe('invalid month below range', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.shouldBeVisible();
        BirthSearchPage.performSearch({
          surname: 'TEST', forenames: 'TEST', day: '10', month: '00', year: '2012'
        });
      });
      it('displays an error message, requests a valid day with the range of 1 and 12', () => {
        BirthSearchPage.dobMonthOutOfRange();
      });
    });
  });
});
