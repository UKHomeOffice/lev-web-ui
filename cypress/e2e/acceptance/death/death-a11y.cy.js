'use strict';

const searchMultipleRecords = require('../../../fixtures/death/expected-death-records');
const searchSingleRecord = require('../../../fixtures/death/expected-death-record');
const LoginPage = require('../../../pages/LoginPage');
const DeathDetailsPage = require('../../../pages/death/DeathDetailsPage');
const DeathResultsPage = require('../../../pages/death/DeathResultsPage');
const DeathSearchPage = require('../../../pages/death/DeathSearchPage');

describe('Death accessibility tests', () => {
  before(() => {
    LoginPage.login();
  });

  it('Death search page should have no accessibility violations', () => {
    DeathSearchPage.visit();
    DeathSearchPage.hasNoA11yViolations();
  });

  it('Death results page should have no accessibility violations', () => {
    DeathSearchPage.visit();
    DeathSearchPage.performSearch(searchMultipleRecords);
    DeathResultsPage.hasNoA11yViolations();
  });

  it('Death details page should have no accessibility violations', () => {
    DeathSearchPage.visit();
    DeathSearchPage.performSearch(searchSingleRecord);
    DeathDetailsPage.hasNoA11yViolations();
  });
});
