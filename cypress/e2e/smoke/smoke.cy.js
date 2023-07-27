'use strict';

const BirthSearchPage = require('../../pages/birth/BirthSearchPage');
const BirthDetailsPage = require('../../pages/birth/BirthDetailsPage');
const DeathSearchPage = require('../../pages/death/DeathSearchPage');
const DeathDetailsPage = require('../../pages/death/DeathDetailsPage');
const HomePage = require('../../pages/HomePage');
const LoginPage = require('../../pages/LoginPage');
const MarriageSearchPage = require('../../pages/marriage/MarriageSearchPage');
const MarriageDetailsPage = require('../../pages/marriage/MarriageDetailsPage');
const PartnershipSearchPage = require('../../pages/partnership/PartnershipSearchPage');
const PartnershipDetailsPage = require('../../pages/partnership/PartnershipDetailsPage');
// const SearchErrorPage = require('../../pages/SearchErrorPage');

if (Cypress.env('e2e')) {
  describe('Smoke Tests', () => {
    describe('Accessing the UI', () => {
      it('presents me with the login prompt', () => {
        HomePage.visit();
        LoginPage.shouldBeVisible();
      });

      describe('allows me to login to LEV', () => {
        it('presents me with a search form for births', () => {
          HomePage.visit();
          LoginPage.login();
          HomePage.shouldBeVisible();
        });
      });
    });

    describe('Birth registrations', () => {
      describe('Searching for a record', () => {
        it('presents me with the results page', () => {
          BirthSearchPage.visit();
          BirthSearchPage.shouldBeVisible();
          BirthSearchPage.performSearch({systemNumber: '123456789'});
          BirthDetailsPage.shouldBeVisible();
          // LoginPage.logout();
        });
      });

      // describe('Trying to access a non-existent record', () => {
      //   it('presents me with the NOT FOUND error page', () => {
      //     SearchErrorPage.visit('/birth/details/404');
      //     SearchErrorPage.shouldBeVisible();
      //   });
      // });
    });

    describe('Death registrations', () => {
      describe('Searching for a record', () => {
        it('presents me with the details page', () => {
          DeathSearchPage.visit();
          DeathSearchPage.shouldBeVisible();
          DeathSearchPage.performSearch({systemNumber: '999999910'});
          DeathDetailsPage.shouldBeVisible();
        });
      });

      // describe('Trying to access a non-existent record', () => {
      //   it('presents me with the NOT FOUND error page', () => {
      //     SearchErrorPage.visit('/death/details/404');
      //     SearchErrorPage.shouldBeVisible();
      //   });
      // });
    });

    describe('Marriage registrations', () => {
      describe('Searching for a record', () => {
        it('presents me with the details page', () => {
          MarriageSearchPage.visit();
          MarriageSearchPage.shouldBeVisible();
          MarriageSearchPage.performSearch({systemNumber: '999999910'});
          MarriageDetailsPage.shouldBeVisible();
        });
      });

      // describe('Trying to access a non-existent record', () => {
      //   it('presents me with the NOT FOUND error page', () => {
      //     SearchErrorPage.visit('/marriage/details/404');
      //     SearchErrorPage.shouldBeVisible();
      //   });
      // });
    });

    describe('Partnership registrations', () => {
      describe('Searching for a record', () => {
        it('presents me with the details page', () => {
          PartnershipSearchPage.visit();
          PartnershipSearchPage.shouldBeVisible();
          PartnershipSearchPage.performSearch({systemNumber: '999999910'});
          PartnershipDetailsPage.shouldBeVisible();
        });
      });

      // describe('Trying to access a non-existent record', () => {
      //   it('presents me with the NOT FOUND error page', () => {
      //     SearchErrorPage.visit('/partnership/details/404');
      //     SearchErrorPage.shouldBeVisible();
      //   });
      // });
    });
  });
}
