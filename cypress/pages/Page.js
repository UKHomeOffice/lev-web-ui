'use strict';

class Page {

  /**
   * Click the logout button
   */
  static clickLogoutButton() {
    cy.get('#logout').click();
  }

  /**
   * Page has no detectable accessibility violations
   */
  static hasNoA11yViolations() {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag21a', 'wcag21aa']
      }
    }, Page.logA11yViolations);
  }

  /**
   * Log accessibility violations
   *
   * @param violations
   */
  static logA11yViolations(violations) {
    cy.task(
      'log',
      `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`
    );

    // pluck specific keys to keep the table readable
    const violationData = violations.map(
      ({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length
      })
    );

    cy.task('table', violationData);
  }
}

module.exports = Page;
