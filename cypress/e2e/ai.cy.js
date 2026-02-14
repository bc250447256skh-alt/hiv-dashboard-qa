describe('AI Query', () => {

  it('shows AI answer for trend question', () => {
    cy.visit('/');

    cy.get('#question').type('HIV trend last month');

    cy.get('#askBtn').click();

    cy.get('#answer', { timeout: 10000 })
      .should('contain', 'HIV positivity');
  });

  it('shows fallback message for unknown question', () => {
    cy.visit('/');

    cy.get('#question').clear().type('What is the weather today?');

    cy.get('#askBtn').click();

    cy.get('#answer', { timeout: 10000 })
      .should('contain', 'No data available');
  });

});

