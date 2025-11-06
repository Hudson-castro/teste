/// <reference types="cypress" />

describe('Agendamento de Consulta (Passos 1..4)', () => {
  beforeEach(() => {
    cy.login('test@user.com', 'Senha@123');
    cy.visit('/agendar');
  });

  it('fluxo completo de agendamento e confirmação', () => {
    cy.intercept('GET', '/api/ubs', { fixture: 'ubs-list.json' }).as('getUbs');
    cy.wait('@getUbs');
    cy.get('[data-cy=ubs-item]').first().click();
    cy.intercept('GET', '/api/professionals?ubsId=*', { fixture: 'professionals-list.json' }).as('getProf');
    cy.wait('@getProf');
    cy.get('[data-cy=professional-item]').contains('Clínico').click();
    cy.intercept('GET', '/api/availability?professionalId=*', { fixture: 'availability.json' }).as('getAvailability');
    cy.get('[data-cy=date-picker]').click();
    cy.get('[data-cy=available-slot]').first().click();
    cy.intercept('POST', '/api/appointments', { statusCode: 201, body: { id: 'ap-1' } }).as('createAppt');
    cy.get('[data-cy=confirm-appointment]').click();
    cy.wait('@createAppt');
    cy.get('[data-cy=toast]').should('contain', 'Agendamento confirmado');
    cy.url().should('include', '/minhas-consultas');
  });
});
