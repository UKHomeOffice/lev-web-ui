'use strict';

class Page {

  /**
   * Click the logout button
   */
  static clickLogoutButton() {
    cy.get('#logout').click();
  }
}

module.exports = Page;
