'use strict';

const DetailsPage = require('../DetailsPage');

class BirthDetailsPage extends DetailsPage {

  static recordSummaryDisplayed(record) {
    DetailsPage.shouldBeVisible();
    cy.get('h1').contains(`${record.child.forenames} ${record.child.surname} ${record.child.dateOfBirth}`);
  }

  static recordDisplaysSystemNumber(record) {
    cy.get('.details tr').eq(1).contains(`System number ${record.id}`);
  }

  static recordDisplaysChildDetails(record) {
    cy.get('.details tr').eq(3).contains(`Last name ${record.child.surname}`);
    cy.get('.details tr').eq(4).contains(`First and middle names ${record.child.forenames}`);
    cy.get('.details tr').eq(5).contains(`Date of birth ${record.child.dateOfBirth}`);
    cy.get('.details tr').eq(6).contains(`Sex ${record.child.sex}`);
    cy.get('.details tr').eq(7).contains(`Place of birth ${record.child.birthplace}`);
  }

  static recordDisplaysMotherDetails(record) {
    cy.get('.details tr').eq(9).contains(`Name ${record.mother.forenames} ${record.mother.surname}`);
    cy.get('.details tr').eq(10).contains(`Maiden name ${record.mother.maidenSurname}`);
    cy.get('.details tr').eq(11).contains(`Last name at marriage ${record.mother.marriageSurname}`);
    cy.get('.details tr').eq(12).contains(`Place of birth ${record.mother.birthplace}`);
  }

  static recordDisplaysFatherDetails(record) {
    cy.get('.details tr').eq(14).contains(`Name ${record.father.forenames} ${record.father.surname}`);
    cy.get('.details tr').eq(15).contains(`Place of birth ${record.father.birthplace}`);
  }

  static recordDisplaysRegistrationDetails(record) {
    cy.get('.details tr').eq(17).contains('Birth registered by Mother');
    cy.get('.details tr').eq(18).contains(`Registration district ${record.registrar.district}`);
    cy.get('.details tr').eq(19).contains(`Sub-district ${record.registrar.subdistrict}`);
    cy.get('.details tr').eq(20).contains(`Administrative area ${record.registrar.administrativeArea}`);
    cy.get('.details tr').eq(21).contains(`Date of registration ${record.date}`);
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
