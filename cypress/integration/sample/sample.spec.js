describe('UI tests', () => {
  it('Home page should be displayed', () => {
    cy.visit('/');
    cy.get('h1').contains('Applicant\'s details');
  });
});
