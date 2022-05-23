'use strict';

const LoginPage = require('../../../pages/LoginPage');
const BirthSearchPage = require('../../../pages/birth/BirthSearchPage');
const BirthDetailsPage = require('../../../pages/birth/BirthDetailsPage');
const BirthResultsPage = require('../../../pages/birth/BirthResultsPage');
const { searchSingleRecord, searchMultipleRecords, validRecord, recordsWithFlags } = require('../../../fixtures/birth/birth');

describe('Birth details', () => {
  before(() => {
    LoginPage.login();
  });
  describe('single record found', () => {
    describe('where there is one result', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch(searchSingleRecord);
      });
      it('single record summary should be displayed', () => {
        BirthDetailsPage.recordSummaryDisplayed(validRecord);
      });
      it('single record summary should be displayed', () => {
        BirthDetailsPage.recordDisplaysSystemNumber(validRecord);
      });
      it('child details should be displayed', () => {
        BirthDetailsPage.recordDisplaysChildDetails(validRecord);
      });
      it('mother details should be displayed', () => {
        BirthDetailsPage.recordDisplaysMotherDetails(validRecord);
      });
      it('father details should be displayed', () => {
        BirthDetailsPage.recordDisplaysFatherDetails(validRecord);
      });
      it('birth registration details should be displayed', () => {
        BirthDetailsPage.recordDisplaysRegistrationDetails(validRecord);
      });
      it('back to search results link not displayed', () => {
        BirthDetailsPage.backToSearchResultsNotDisplayed();
      });
      describe('When I select the "New search" button', () => {
        before(() => {
          BirthSearchPage.visit();
          BirthSearchPage.performSearch(searchSingleRecord);
          BirthDetailsPage.clickNewSearchLink();
        });
        it('shows the search page', () => {
          BirthSearchPage.shouldBeVisible();
        });
        it('new search has empty values', () => {
          BirthSearchPage.searchFormClear();
        });
      });
      describe('When I select the "Edit search" button', () => {
        before(() => {
          BirthSearchPage.visit();
          BirthSearchPage.performSearch(searchSingleRecord);
          BirthDetailsPage.clickEditSearchLink();
        });
        it('shows the search page', () => {
          BirthSearchPage.shouldBeVisible();
        });
        it('has the correct form values', () => {
          BirthSearchPage.searchFormRetainedValues(searchSingleRecord);
        });
      });
    });
    describe('multiple records found', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch(searchMultipleRecords);
      });
      it('back to search results link not displayed', () => {
        BirthDetailsPage.backToSearchResultsNotDisplayed();
      });
      describe('When I select the "Back to search results link on the details page"', () => {
        before(() => {
          BirthSearchPage.visit();
          BirthSearchPage.performSearch(searchMultipleRecords);
        });
        it('returned me to the results page', () => {
          BirthResultsPage.selectFirstRecord();
          BirthDetailsPage.clickBackToResultsLink();
          BirthResultsPage.multipleRecordsFound();
        });
      });
    });
    describe('Records with flags', () => {
      it('blocked Record shows Refer to GRO banner ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({
          systemNumber: recordsWithFlags.blocked, surname: '', forenames: '', day: '', month: '', year: ''
        });
        BirthDetailsPage.flagVisible('Refer to GRO');
      });
      it('cancelled Record shows Refer to GRO banner ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({
          systemNumber: recordsWithFlags.cancelled, surname: '', forenames: '', day: '', month: '', year: ''
        });
        BirthDetailsPage.flagVisible('Refer to GRO');
      });
      it('court order Record shows a court order is in place ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({
          systemNumber: recordsWithFlags.courtOrder, surname: '', forenames: '', day: '', month: '', year: ''
        });
        BirthDetailsPage.flagVisible('This record has an adoption / court order in place.');
      });
      it('fictitious birth Record shows Refer to GRO banner ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({
          systemNumber: recordsWithFlags.fictitious, surname: '', forenames: '', day: '', month: '', year: ''
        });
        BirthDetailsPage.flagVisible('Refer to GRO');
      });
      it('re-registered birth Record shows unmarried parents subsequently married and contains link to new record', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({
          systemNumber: recordsWithFlags.reRegistered, surname: '', forenames: '', day: '', month: '', year: ''
        });
        BirthDetailsPage.flagVisible('Unmarried parents subsequently married.');
        BirthDetailsPage.previousRegistrationDetails(recordsWithFlags.caution);
      });
      it('subsequently married birth Record shows refer to GRO banner ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({
          systemNumber: recordsWithFlags.subsequentlyMarried, surname: '', forenames: '', day: '', month: '', year: ''
        });
        BirthDetailsPage.flagVisible('Refer to GRO');
      });
    });
  });
});


