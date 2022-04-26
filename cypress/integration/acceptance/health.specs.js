'use strict';

describe('Health check', () => {
  describe('the livenessProbe', () => {
    it('should return a "200 - OK" status', () => {
      cy.request('/healthcheck').its('status').should('equal', 200);
    });
  });
  describe('the readinessProbe', () => {
    it('should return a "200 - OK" status', () => {
      cy.request('/healthcheck').its('status').should('equal', 200);
    });
  });
});
