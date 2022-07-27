'use strict';

const { searchSingleRecord, searchMultipleRecords } = require('../../../fixtures/birth/birth');
const LoginPage = require('../../../pages/LoginPage');
const BirthDetailsPage = require('../../../pages/birth/BirthDetailsPage');
const BirthResultsPage = require('../../../pages/birth/BirthResultsPage');
const BirthSearchPage = require('../../../pages/birth/BirthSearchPage');

describe('Birth accessibility tests', () => {
  before(() => {
    LoginPage.login();
  });

  it('Birth search page should have no accessibility violations', () => {
    BirthSearchPage.visit();
    BirthSearchPage.hasNoA11yViolations();
  });

  it('Birth results page should have no accessibility violations', () => {
    BirthSearchPage.visit();
    BirthSearchPage.performSearch(searchMultipleRecords);
    BirthResultsPage.hasNoA11yViolations();
  });

  it('Birth details page should have no accessibility violations', () => {
    BirthSearchPage.visit();
    BirthSearchPage.performSearch(searchSingleRecord);
    BirthDetailsPage.hasNoA11yViolations();
  });
});
