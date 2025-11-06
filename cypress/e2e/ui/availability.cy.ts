/// <reference types="cypress" />

describe('Verificar Disponibilidade de Profissional', () => {
  beforeEach(() => {
    cy.login('test@user.com', 'Senha@123');
    cy.visit('/consulta/disponibilidade');
  });

  it('mostra horários livres para uma data selecionada', () => {
    cy.get('[data-cy=professional-select]').select('Dr. Fulano');
    cy.get('[data-cy=date-input]').type('2025-10-10');
    cy.intercept('GET', '/api/availability?professionalId=*', { fixture: 'availability.json' }).as('getAvailability');
    cy.get('[data-cy=check-availability]').click();
    cy.wait('@getAvailability');
    cy.get('[data-cy=available-slot]').should('have.length.greaterThan', 0);
  });
});
