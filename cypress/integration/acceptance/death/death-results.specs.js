'use strict';

const searchMultipleRecords = require('../../../fixtures/death/expected-death-records');
const LoginPage = require('../../../pages/LoginPage');
const DeathSearchPage = require('../../../pages/death/DeathSearchPage');
const DeathResultsPage = require('../../../pages/death/DeathResultsPage');
const DeathDetailsPage = require('../../../pages/death/DeathDetailsPage');

describe('Death results', () => {
  before(() => {
    LoginPage.login();
  });
  describe('that returns no records', () => {
    it('a record not found message should be displayed', () => {
      const expected = {
        search: { surname: 'InvalidRecord', forenames: 'Test', dobd: { day: '01', month: '01', year: '2011' } },
        results: []
      };

      DeathSearchPage.visit();
      DeathSearchPage.performSearch(expected.search);
      DeathResultsPage.hasExpectedTitle(expected);
    });
  });
  describe('that returns multiple records', () => {
    const multipleValidRecords = searchMultipleRecords.results[0];
    before(() => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch(searchMultipleRecords.search);
      DeathResultsPage.multipleRecordsFound();
      DeathResultsPage.selectFirstRecord();
    });
    it('single record summary should be displayed', () => {
      DeathDetailsPage.recordSummaryDisplayed(multipleValidRecords);
    });
    it('system number should be displayed', () => {
      DeathDetailsPage.recordDisplaysSystemNumber(multipleValidRecords);
    });
    it('child details should be displayed', () => {
      DeathDetailsPage.recordDisplaysChildDetails(multipleValidRecords);
    });
    it('mother details should be displayed', () => {
      DeathDetailsPage.recordDisplaysMotherDetails(multipleValidRecords);
    });
    it('father details should be displayed', () => {
      DeathDetailsPage.recordDisplaysFatherDetails(multipleValidRecords);
    });
    it('death registration details should be displayed', () => {
      DeathDetailsPage.recordDisplaysRegistrationDetails(multipleValidRecords);
    });
    describe('using a "fast entry" date format', () => {
      it('completes a search', () => {
        const displayedDOB = '01/01/2010';
        DeathSearchPage.visit();
        DeathSearchPage.performSearch({ ...searchMultipleRecords.search, day: '1', month: '1', year: '10' });
        DeathResultsPage.multipleRecordsFound(displayedDOB);
      });
    });
    it('displays message that multiple records found', () => {
      DeathSearchPage.visit();
      DeathSearchPage.performSearch(searchMultipleRecords.search);
      DeathResultsPage.editSearchButtonExists();
    });
    describe('When I select the "Edit search" link on the results page', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch(searchMultipleRecords.search);
        DeathResultsPage.clickEditSearchButton();
      });
      it('has the correct form values', () => {
        DeathSearchPage.searchFormRetainedValues(searchMultipleRecords.search);
      });
    });
    describe('When I select the "New search" link on the results page', () => {
      before(() => {
        DeathSearchPage.visit();
        DeathSearchPage.performSearch(searchMultipleRecords.search);
        DeathResultsPage.clickNewSearchButton();
      });
      it('has the correct form values', () => {
        DeathSearchPage.searchFormClear();
      });
    });
  });
});
