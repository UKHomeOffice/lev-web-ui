'use strict'

const Page = require("../Page");

class serviceNotificationIndexPage extends Page{
  static visit() {
    cy.visit('/admin/notify-users');
  }

  /**
   * Check service notification index page is visible
   */
  static shouldBeVisible() {
    cy.url().should('include', '/admin/notify-users');
  }

  /**
   * Check service notification index page has the expected result
   */
  static hasExpectedTitle() {
    cy.get('h1').contains('Service notification');
  }

  /**
   * Check service notification index page has the expected data
   */
  static hasServiceNotification(record) {
    if(record === null) {
      cy.get('.govuk-table__cell').contains('No live messages');
    } else {
      const { liveNotification } = record;
      cy.get('.govuk-table__cell').contains(liveNotification);
    }
  }

  static hasDeleteButton() {
    cy.get('.govuk-table__cell').contains('Delete');
  }

  static hasAddNotificationButton() {
    cy.get('#add-notification').should('exist');
  }

  static homeBreadcrumbLinkDisplayed() {
    cy.get('.govuk-breadcrumbs__link').should('exist');
  }
}

module.exports = serviceNotificationIndexPage;