'use strict';

const searchMultipleRecords = require('../../../fixtures/marriage/expected-marriage-records');
const searchSingleRecord = require('../../../fixtures/marriage/expected-marriage-record');
const LoginPage = require('../../../pages/LoginPage');
const MarriageDetailsPage = require('../../../pages/marriage/MarriageDetailsPage');
const MarriageResultsPage = require('../../../pages/marriage/MarriageResultsPage');
const MarriageSearchPage = require('../../../pages/marriage/MarriageSearchPage');

describe('Marriage accessibility tests', () => {
  before(() => {
    LoginPage.login();
  });

  it('Marriage search page should have no accessibility violations', () => {
    MarriageSearchPage.visit();
    MarriageSearchPage.hasNoA11yViolations();
  });

  it('Marriage results page should have no accessibility violations', () => {
    MarriageSearchPage.visit();
    MarriageSearchPage.performSearch(searchMultipleRecords);
    MarriageResultsPage.hasNoA11yViolations();
  });

  it('Marriage details page should have no accessibility violations', () => {
    MarriageSearchPage.visit();
    MarriageSearchPage.performSearch(searchSingleRecord);
    MarriageDetailsPage.hasNoA11yViolations();
  });
});
