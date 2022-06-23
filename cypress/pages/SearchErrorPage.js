'use strict';

const ErrorPage = require('./ErrorPage');

class SearchErrorPage extends ErrorPage {

  /**
   * Check the search error page is visible
   */
  static shouldBeVisible() {
    cy.get('#header').contains('Page not found');
  }
}

module.exports = SearchErrorPage;
