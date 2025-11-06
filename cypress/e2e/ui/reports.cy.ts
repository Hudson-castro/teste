/// <reference types="cypress" />

describe('Geração de Relatórios (Administrador)', () => {
  beforeEach(() => {
    cy.login('admin@ubs.com', 'AdminPass1');
    cy.visit('/admin/reports');
  });

  it('gera relatório PDF e CSV via interface', () => {
    cy.get('[data-cy=report-from]').type('2025-01-01');
    cy.get('[data-cy=report-to]').type('2025-12-31');
    cy.intercept('POST', '/api/reports/generate', (req) => {
      req.reply({ statusCode: 200, body: { url: '/downloads/report-2025.pdf' } });
    }).as('generateReport');
    cy.get('[data-cy=generate-report]').click();
    cy.wait('@generateReport');
    cy.get('[data-cy=download-link]').should('have.attr', 'href').and('include', '.pdf');
  });
});
