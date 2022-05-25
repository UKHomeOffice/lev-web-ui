'use strict';

const DetailsPage = require('../DetailsPage');

class BirthDetailsPage extends DetailsPage {

  static recordSummaryDisplayed(record) {
    DetailsPage.shouldBeVisible();
    cy.get('h1').contains(`${record.child.forenames} ${record.child.surname} ${record.child.dateOfBirth}`);
  }

  static recordDisplaysSystemNumber(record) {
    cy.get('.details tr').eq(0).contains(`System number ${record.id}`);
  }

  static recordDisplaysChildDetails(record) {
    cy.get('.details tr').eq(2).contains(`Surname ${record.child.surname}`);
    cy.get('.details tr').eq(3).contains(`Forename(s) ${record.child.forenames}`);
    cy.get('.details tr').eq(4).contains(`Date of birth ${record.child.dateOfBirth}`);
    cy.get('.details tr').eq(5).contains(`Sex ${record.child.sex}`);
    cy.get('.details tr').eq(6).contains(`Place of birth ${record.child.birthplace}`);
  }

  static recordDisplaysMotherDetails(record) {
    cy.get('.details tr').eq(8).contains(`Name ${record.mother.forenames} ${record.mother.surname}`);
    cy.get('.details tr').eq(9).contains(`Maiden name ${record.mother.maidenSurname}`);
    cy.get('.details tr').eq(10)
      .contains(`Surname at marriage if different from maiden name ${record.mother.marriageSurname}`);
    cy.get('.details tr').eq(11).contains(`Place of birth ${record.mother.birthplace}`);
  }

  static recordDisplaysFatherDetails(record) {
    cy.get('.details tr').eq(13).contains(`Name ${record.father.forenames} ${record.father.surname}`);
    cy.get('.details tr').eq(14).contains(`Place of birth ${record.father.birthplace}`);
  }

  static recordDisplaysRegistrationDetails(record) {
    cy.get('.details tr').eq(16).contains('Birth registered by Mother');
    cy.get('.details tr').eq(17).contains(`Registration district ${record.registrar.district}`);
    cy.get('.details tr').eq(18).contains(`Sub-district ${record.registrar.subdistrict}`);
    cy.get('.details tr').eq(19).contains(`Administrative area ${record.registrar.administrativeArea}`);
    cy.get('.details tr').eq(20).contains(`Date of registration ${record.date}`);
  }

  static clickNewSearchLink() {
    cy.get('a[href="/birth"]').contains('New search').click();
  }

  static clickEditSearchLink() {
    cy.get('a[href="/birth/search"]').contains('Edit search').click();
  }

  static clickBackToResultsLink() {
    cy.get('a[href="/birth/results"]').contains('Back to results').click();
  }

  static editSearchLinkVisible() {
    cy.get('#editSearchLink').contains('Edit search');
  }

  static backToSearchResultsDisplayed() {
    cy.get('#backToSearchResults').should('exist');
  }

  static backToSearchResultsNotDisplayed() {
    cy.get('#backToSearchResults').should('not.exist');
  }

  static flagVisible(flag) {
    cy.get('.flag').contains(flag);
  }

  static previousRegistrationDetails(systemNumber) {
    cy.get(`a[href="/birth/details/${systemNumber}"]`).contains('View the previous registration').click();
    cy.get('.details tr').should('exist');
  }
}

module.exports = BirthDetailsPage;
