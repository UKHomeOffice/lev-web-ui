'use strict';

const BackToSearchPage = require('./BackToSearchPage');

class DetailsPage extends BackToSearchPage {

  /**
   * Check the details page is visible
   */
  static shouldBeVisible() {
    cy.url().should('include', '/details');
  }

  /**
   * Check the "Back to results" button is visible
   */
  static backToResultsButtonExists() {
    cy.get('#backToResults').should('exist');
  }

  /**
   * Check the "Back to results" button is NOT visible
   */
  static backToResultsButtonNotExists() {
    cy.get('#backToResults').should('not.exist');
  }

  /**
   * Click the "Back to results" button
   */
  static clickBackToResultsButton() {
    cy.get('#backToResults').click();
  }

  /**
   * Check the expected rows are displayed
   * @param rows
   */
  static hasExpectedRows(rows) {
    cy.get('table.details').each((element, index) => {
      cy.wrap(element).contains(rows[index]);
    });
  }
}

module.exports = DetailsPage;
