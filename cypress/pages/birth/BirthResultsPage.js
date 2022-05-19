'use strict';

const ResultsPage = require('../ResultsPage');
const expectedMultipleRec = require('../../fixtures/birth/birth').multipleValidRecords;

class BirthResultsPage extends ResultsPage {

  static noRecordFound() {
    cy.get('h1').contains('No records found for Test InvalidRecord 01/01/2011');
  }

  static multipleRecordsFound(dob) {
    const child = expectedMultipleRec.child;
    const {surname, givenName} = expectedMultipleRec.child.name;
    const dateOfBirth = dob ? dob : expectedMultipleRec.child.dateOfBirth;

    ResultsPage.shouldBeVisible();

    // displays message that multiple records found
    cy.get('h1').contains(`3 records found for ${givenName} ${surname} ${dateOfBirth}`);

    // displays a subset of each record in a list

    cy.get('tbody tr').eq(1).contains(`Place of birth ${child.birthplace}`);
    cy.get('tbody tr').eq(2).contains('Mother Mum One Multiple');
    cy.get('tbody tr').eq(3).contains('Father Dad One Multiple');

    cy.get('tbody tr').eq(5).contains(`Place of birth ${child.birthplace}`);
    cy.get('tbody tr').eq(6).contains('Mother Mum Two Multiple');
    cy.get('tbody tr').eq(7).contains('Father Dad Two Multiple');

    cy.get('tbody tr').eq(9).contains(`Place of birth ${child.birthplace}`);
    cy.get('tbody tr').eq(10).contains('Mother Mum Three Multiple');
    cy.get('tbody tr').eq(11).contains('Father Dad Three Multiple');
  }

  static selectFirstRecord() {
    cy.get('.govuk-table__body a').eq(0).click();
  }

  static editSearchLinkDisplayed() {
    cy.get('a[href="/birth/search"]').contains('Edit search');
  }

  static clickNewSearchLink() {
    cy.get('a[href="/birth"]').contains('New search').click();
  }

  static clickEditSearchLink() {
    cy.get('a[href="/birth/search"]').contains('Edit search').click();
  }
}

module.exports = BirthResultsPage;
