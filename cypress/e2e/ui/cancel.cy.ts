/// <reference types="cypress" />

describe('Cancelar Consulta', () => {
  beforeEach(() => {
    cy.login('test@user.com', 'Senha@123');
    cy.visit('/minhas-consultas');
  });

  it('cancela uma consulta agendada e verifica liberação', () => {
    cy.intercept('GET', '/api/appointments?userId=*', { fixture: 'my-appointments.json' }).as('getApps');
    cy.wait('@getApps');
    cy.get('[data-cy=appointment-card]').first().within(() => {
      cy.get('[data-cy=cancel-btn]').click();
    });

    cy.get('[data-cy=confirm-cancel]').click();
    cy.intercept('POST', '/api/appointments/*/cancel', { statusCode: 200 }).as('postCancel');
    cy.wait('@postCancel');
    cy.get('[data-cy=toast]').should('contain', 'cancelado');
  });
});
