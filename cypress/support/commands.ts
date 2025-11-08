// cypress/support/commands.ts

Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/');
  cy.get('input[placeholder*="Email"], input[placeholder*="CPF"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('admin@ubs.salvador.gov.br');
  cy.get('input[placeholder="Senha"]').clear().type('admin123');
  cy.contains('button', 'Entrar').click();
  
  // Espera o dashboard do admin carregar
  cy.contains(/painel administrativo/i, { timeout: 15000 }).should('be.visible');
  cy.contains('button', /gerenciar pacientes/i, { timeout: 15000 }).should('be.visible');
  cy.contains('button', /gerenciar profissionais/i, { timeout: 15000 }).should('be.visible');
  cy.wait(500);
});

Cypress.Commands.add('loginAsPaciente', () => {
  cy.visit('/');
  cy.get('input[placeholder*="Email"], input[placeholder*="CPF"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('maria@email.com');
  cy.get('input[placeholder="Senha"]').clear().type('123456');
  cy.contains('button', 'Entrar').click();
  
  // Espera o dashboard do paciente carregar
  cy.contains(/olá, maria/i, { timeout: 15000 }).should('be.visible');
  cy.get('[data-testid="btn-schedule"]', { timeout: 15000 }).should('be.visible');
  cy.get('[data-testid="btn-consultations"]', { timeout: 20000 }).should('be.visible');
});

Cypress.Commands.add('loginAsProfessional', () => {
  cy.visit('/');
  cy.get('input[placeholder*="Email"], input[placeholder*="CPF"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('111.222.333-44');
  cy.get('input[placeholder="Senha"]').clear().type('123456');
  cy.contains('button', 'Entrar').click();
  
  // Espera o dashboard do profissional carregar
  cy.contains(/dr\.?\s*joão silva/i, { timeout: 15000 }).should('be.visible');
  cy.contains(/horários disponíveis/i, { timeout: 15000 }).should('be.visible');
  cy.get('[data-testid="professional-scheduled-count"]', { timeout: 15000 }).should('be.visible');
  cy.wait(500);
});