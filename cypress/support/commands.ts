// cypress/support/commands.ts

// Adiciona as tipagens para os novos comandos do Cypress,
// para que o TypeScript os reconheça.
declare global {
  namespace Cypress {
    interface Chainable {
      loginAsAdmin(): Chainable<void>;
      loginAsPatient(): Chainable<void>;
      loginAsProfessional(): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

/**
 * Comando customizado para fazer login como Administrador.
 * Usa as credenciais: admin@ubs.salvador.gov.br / admin123
 */
Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/'); // Visita a página inicial (que contém o formulário de login)
  cy.get('input[placeholder*="Email"]').type('admin@ubs.salvador.gov.br');
  cy.get('input[placeholder*="Senha"]').type('admin123');
  cy.get('button').contains('Entrar').click();
  // Verifica se o login foi bem-sucedido e a URL não é mais a de login
  cy.url().should('not.include', 'login'); 
});

/**
 * Comando customizado para fazer login como Paciente.
 * Usa as credenciais: maria@email.com / 123456
 */
Cypress.Commands.add('loginAsPatient', () => {
  cy.visit('/');
  cy.get('input[placeholder*="Email"]').type('maria@email.com');
  cy.get('input[placeholder*="Senha"]').type('123456');
  cy.get('button').contains('Entrar').click();
  cy.url().should('not.include', 'login');
});

/**
 * Comando customizado para fazer login como Profissional.
 * Usa as credenciais: 111.222.333-44 / 123456
 */
Cypress.Commands.add('loginAsProfessional', () => {
  cy.visit('/');
  cy.get('input[placeholder*="Email"]').type('111.222.333-44'); // CPF
  cy.get('input[placeholder*="Senha"]').type('123456');
  cy.get('button').contains('Entrar').click();
  cy.url().should('not.include', 'login');
});

/**
 * Comando customizado para fazer logout da aplicação.
 * Assume que existe um botão com o título "Sair" visível após o login.
 */
Cypress.Commands.add('logout', () => {
  // O componente React fornecido usa um botão com title="Sair"
  cy.get('button[title="Sair"]').click();
  // Após logout, o usuário deve voltar para a tela de login
  cy.contains('UBS Digital Salvador').should('be.visible');
  cy.contains('Sistema de Agendamento').should('be.visible');
});