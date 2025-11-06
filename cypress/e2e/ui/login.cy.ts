// cypress/e2e/login.cy.ts

describe('Login Tests', () => {
  // Garante que a página esteja limpa antes de cada teste
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('Should login successfully as Admin and display admin content', () => {
    cy.loginAsAdmin();
    // Verifica elementos específicos que aparecem após o login de admin
    cy.contains('UBS Digital Salvador').should('be.visible');
    cy.contains('Bem-vindo, Administrador!').should('be.visible'); // Se houver esse texto na interface de admin
  });

  it('Should login successfully as Patient and display patient home content', () => {
    cy.loginAsPatient();
    // Verifica elementos específicos que aparecem após o login do paciente
    cy.contains('Olá, Maria!').should('be.visible'); // Ou outro nome de paciente
    cy.contains('Próxima Consulta').should('be.visible');
  });

  it('Should login successfully as Professional and display professional home content', () => {
    cy.loginAsProfessional();
    // Verifica elementos específicos que aparecem após o login do profissional
    cy.contains('Olá, João!').should('be.visible'); // Ou outro nome de profissional
    cy.contains('Minhas Consultas').should('be.visible'); // Se houver esse texto
  });

  it('Should show error with invalid credentials', () => {
    cy.get('input[placeholder*="Email"]').type('usuario@invalido.com');
    cy.get('input[placeholder*="Senha"]').type('senhaerrada');
    cy.get('button').contains('Entrar').click();
    // Verifica a mensagem de erro
    cy.contains('Email/CPF ou senha incorretos!').should('be.visible');
    // A URL deve permanecer a mesma (tela de login)
    cy.url().should('equal', Cypress.config().baseUrl + '/');
  });

  it('Should logout successfully from patient account', () => {
    cy.loginAsPatient();
    cy.logout();
    // Após o logout, a tela de login deve estar visível
    cy.contains('UBS Digital Salvador').should('be.visible');
    cy.contains('Sistema de Agendamento').should('be.visible');
  });
});