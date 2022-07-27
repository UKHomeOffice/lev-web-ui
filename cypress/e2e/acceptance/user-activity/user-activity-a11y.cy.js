'use strict';

const { searchMultipleRecords } = require('../../../fixtures/user-activity');
const LoginPage = require('../../../pages/LoginPage');
const UserActivityResultsPage = require('../../../pages/user-activity/UserActivityResultsPage');
const UserActivitySearchPage = require('../../../pages/user-activity/UserActivitySearchPage');

describe('User activity accessibility tests', () => {
  before(() => {
    LoginPage.login();
  });

  it('User activity search page should have no accessibility violations', () => {
    UserActivitySearchPage.visit();
    UserActivitySearchPage.hasNoA11yViolations();
  });

  it('UserActivity results page should have no accessibility violations', () => {
    UserActivitySearchPage.visit();
    UserActivitySearchPage.performSearch(searchMultipleRecords);
    UserActivityResultsPage.hasNoA11yViolations();
  });
});
