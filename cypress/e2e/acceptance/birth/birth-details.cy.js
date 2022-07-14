'use strict';

const LoginPage = require('../../../pages/LoginPage');
const BirthSearchPage = require('../../../pages/birth/BirthSearchPage');
const BirthDetailsPage = require('../../../pages/birth/BirthDetailsPage');
const BirthResultsPage = require('../../../pages/birth/BirthResultsPage');
const { searchSingleRecord, searchMultipleRecords, validRecordResult, recordsWithFlags } = require('../../../fixtures/birth/birth');

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
        BirthDetailsPage.recordSummaryDisplayed(validRecordResult);
      });
      it('single record summary should be displayed', () => {
        BirthDetailsPage.recordDisplaysSystemNumber(validRecordResult);
      });
      it('child details should be displayed', () => {
        BirthDetailsPage.recordDisplaysChildDetails(validRecordResult);
      });
      it('mother details should be displayed', () => {
        BirthDetailsPage.recordDisplaysMotherDetails(validRecordResult);
      });
      it('father details should be displayed', () => {
        BirthDetailsPage.recordDisplaysFatherDetails(validRecordResult);
      });
      it('birth registration details should be displayed', () => {
        BirthDetailsPage.recordDisplaysRegistrationDetails(validRecordResult);
      });
      it('back to search results link not displayed', () => {
        BirthDetailsPage.backToResultsButtonNotExists();
      });
      describe('When I select the "New search" button', () => {
        before(() => {
          BirthSearchPage.visit();
          BirthSearchPage.performSearch(searchSingleRecord);
          BirthDetailsPage.clickNewSearchButton();
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
    describe('multiple records found', () => {
      before(() => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch(searchMultipleRecords);
      });
      it('back to search results link not displayed', () => {
        BirthDetailsPage.backToResultsButtonNotExists();
      });
      describe('When I select the "Back to search results link on the details page"', () => {
        before(() => {
          BirthSearchPage.visit();
          BirthSearchPage.performSearch(searchMultipleRecords);
        });
        it('returned me to the results page', () => {
          BirthResultsPage.clickFirstRecord();
          BirthDetailsPage.clickBackToResultsButton();
          BirthResultsPage.multipleRecordsFound();
        });
      });
    });
    describe('Records with flags', () => {
      it('blocked Record shows Refer to GRO banner ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({ systemNumber: recordsWithFlags.blocked });
        BirthDetailsPage.flagVisible('Refer to GRO');
      });
      it('blocked Record with links shows Refer to GRO banner and does not show links ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({ systemNumber: recordsWithFlags.all });
        BirthDetailsPage.flagVisible('Refer to GRO');
        BirthDetailsPage.previousRegistrationButtonNotExists();
        BirthDetailsPage.nextRegistrationButtonNotExists();
      });
      it('cancelled Record shows Refer to GRO banner ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({ systemNumber: recordsWithFlags.cancelled });
        BirthDetailsPage.flagVisible('Refer to GRO');
      });
      it('court order Record shows a court order is in place ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({ systemNumber: recordsWithFlags.courtOrder });
        BirthDetailsPage.flagVisible('This record has an adoption / court order in place.');
      });
      it('fictitious birth Record shows Refer to GRO banner ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({ systemNumber: recordsWithFlags.fictitious });
        BirthDetailsPage.flagVisible('Refer to GRO');
      });
      it('re-registered birth Record shows unmarried parents subsequently married and contains link to new record', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({ systemNumber: recordsWithFlags.reRegistered });
        BirthDetailsPage.flagVisible('Unmarried parents subsequently married.');
        BirthDetailsPage.previousRegistrationDetails(recordsWithFlags.caution);
      });
      it('subsequently married birth Record shows refer to GRO banner ', () => {
        BirthSearchPage.visit();
        BirthSearchPage.performSearch({ systemNumber: recordsWithFlags.subsequentlyMarried });
        BirthDetailsPage.flagVisible('Refer to GRO');
      });
    });
  });
});


