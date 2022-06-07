'use strict';

const ResultsPage = require('../ResultsPage');
const expectedMultipleRec = require('../../fixtures/birth/birth').multipleResults;

class BirthResultsPage extends ResultsPage {

  static noRecordFound() {
    cy.get('h1').contains('No records found for Test InvalidRecord 01/01/2011');
  }

  static multipleRecordsFound(dob) {
    const child = expectedMultipleRec[0].child;
    const { surname, forenames } = expectedMultipleRec[0].child;
    const forename = forenames.split(' ')[0];
    const dateOfBirth = dob ? dob : expectedMultipleRec[0].child.dateOfBirth;

    ResultsPage.shouldBeVisible();

    // displays message that multiple records found
    cy.get('h1').contains(`3 records found for ${forename} ${surname} ${dateOfBirth}`);

    // displays a subset of each record in a list

    cy.get('tbody tr').eq(1).contains(`Place of birth ${child.birthplace}`);
    cy.get('tbody tr').eq(2).contains(`Mother ${expectedMultipleRec[0].mother.forenames} Multiple`);
    cy.get('tbody tr').eq(3).contains(`Father ${expectedMultipleRec[0].father.forenames} Multiple`);

    cy.get('tbody tr').eq(5).contains(`Place of birth ${child.birthplace}`);
    cy.get('tbody tr').eq(6).contains(`Mother ${expectedMultipleRec[1].mother.forenames} Multiple`);
    cy.get('tbody tr').eq(7).contains(`Father ${expectedMultipleRec[1].father.forenames} Multiple`);

    cy.get('tbody tr').eq(9).contains(`Place of birth ${child.birthplace}`);
    cy.get('tbody tr').eq(10).contains(`Mother ${expectedMultipleRec[2].mother.forenames} Multiple`);
    cy.get('tbody tr').eq(11).contains(`Father ${expectedMultipleRec[2].father.forenames} Multiple`);
  }

  static selectFirstRecord() {
    cy.get('.govuk-table__body a').eq(0).click();
  }

  static flagsVisible() {
    cy.get('.flag').eq(0).contains('Refer to GRO');
    cy.get('.flag').eq(1).contains('Unmarried parents subsequently married');
  }
}

module.exports = BirthResultsPage;
