'use strict';

const searchMultipleRecords = require('../../../fixtures/partnership/expected-partnership-records');
const searchSingleRecord = require('../../../fixtures/partnership/expected-partnership-record');
const LoginPage = require('../../../pages/LoginPage');
const PartnershipDetailsPage = require('../../../pages/partnership/PartnershipDetailsPage');
const PartnershipResultsPage = require('../../../pages/partnership/PartnershipResultsPage');
const PartnershipSearchPage = require('../../../pages/partnership/PartnershipSearchPage');

describe('Partnership accessibility tests', () => {
  before(() => {
    LoginPage.login();
  });

  it('Partnership search page should have no accessibility violations', () => {
    PartnershipSearchPage.visit();
    PartnershipSearchPage.hasNoA11yViolations();
  });

  it('Partnership results page should have no accessibility violations', () => {
    PartnershipSearchPage.visit();
    PartnershipSearchPage.performSearch(searchMultipleRecords);
    PartnershipResultsPage.hasNoA11yViolations();
  });

  it('Partnership details page should have no accessibility violations', () => {
    PartnershipSearchPage.visit();
    PartnershipSearchPage.performSearch(searchSingleRecord);
    PartnershipDetailsPage.hasNoA11yViolations();
  });
});
