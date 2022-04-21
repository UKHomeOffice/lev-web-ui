'use strict';

const HomePage = require('../../pages/HomePage');
const LoginPage = require('../../pages/LoginPage');

if (Cypress.env('e2e')) {
  describe('Smoke Tests', () => {
    describe('Accessing the UI', () => {
      before(() => {
        LoginPage.logout();
      });

      it('presents me with the login prompt', () => {
        HomePage.visit();
        LoginPage.shouldBeVisible();
      });

      describe('allows me to login to LEV', () => {
        before(() => {
          LoginPage.login();
        });

        it('presents me with a search form for births', () => {
          HomePage.visit();
          HomePage.shouldBeVisible();
        });
      });
    });
  });
} else {
  describe('Smoke Tests', () => {
    describe('Accessing the UI', () => {
      it('presents me with a search form for births', () => {
        HomePage.visit();
        HomePage.shouldBeVisible();
      });
    });
  });
}
