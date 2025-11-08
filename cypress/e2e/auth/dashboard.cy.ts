/// <reference types="cypress" />

describe('Dashboard - UBS Digital Salvador', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  // ==============================================================
  // DASHBOARD - ADMINISTRADOR
  // ==============================================================
  context('Dashboard do Administrador', () => {

    beforeEach(() => {
      cy.loginAsAdmin();
      cy.wait(500);
    });

    it('Deve exibir o painel administrativo corretamente', () => {
      cy.contains(/painel administrativo/i).should('be.visible');
      cy.contains(/gerenciar pacientes/i).should('be.visible');
      cy.contains(/gerenciar profissionais/i).should('be.visible');
    });

    it('Deve navegar para Gerenciar Pacientes', () => {
      cy.contains(/gerenciar pacientes/i).click();
      cy.contains(/gerenciar pacientes/i, { timeout: 10000 }).should('be.visible');
    });

    it('Deve exibir o número total de pacientes e profissionais', () => {
      cy.get('p.text-2xl').eq(0).invoke('text').should('match', /\d+/);
      cy.get('p.text-2xl').eq(1).invoke('text').should('match', /\d+/);
    });
  });

  // ==============================================================
  // DASHBOARD - PACIENTE
  // ==============================================================
  context('Dashboard do Paciente', () => {

    beforeEach(() => {
      cy.loginAsPaciente();
      cy.wait(500);
    });

    it('Deve exibir o nome do paciente e próximas consultas', () => {
      cy.contains(/olá, maria/i).should('be.visible');
      cy.contains(/próxima consulta/i).should('be.visible');
    });

    it('Deve exibir botões de navegação principais', () => {
      cy.contains('button', /agendar/i).should('be.visible');
      cy.contains('button', /minhas consultas|consultas agendadas|consultas/i).should('be.visible');
    });

    it('Deve exibir UBS próximas', () => {
      cy.contains(/ubs/i).should('be.visible');
      cy.get('.text-gray-800').should('have.length.greaterThan', 0);
    });
  });

  // ==============================================================
  // DASHBOARD - PROFISSIONAL
  // ==============================================================
  context('Dashboard do Profissional', () => {

    beforeEach(() => {
      cy.loginAsProfessional();
      cy.wait(500);
    });

    it('Deve exibir o nome e especialidade do profissional', () => {
      cy.contains(/dr\.?\s*joão silva/i).should('be.visible');
      cy.contains(/cardiologia/i).should('be.visible');
    });

    it('Deve listar consultas agendadas e realizadas', () => {
      cy.contains(/agendada/i).should('exist');
      cy.contains(/realizada/i).should('exist');
    });

    it('Deve exibir os horários disponíveis', () => {
      cy.contains(/horários disponíveis|agenda|meus horários/i).should('be.visible');
      cy.get('.grid > div').should('have.length.greaterThan', 0);
    });
  });

  // ==============================================================
  // FUNCIONALIDADES GERAIS DO DASHBOARD
  // ==============================================================
  context('Funcionalidades Gerais do Dashboard', () => {

    beforeEach(() => {
      cy.loginAsAdmin();
      cy.wait(500);
    });

    it('Deve bloquear e desbloquear o sistema com sucesso', () => {
      cy.get('button').eq(-2).click({ force: true });
      cy.contains(/app bloqueado|bloqueado/i, { timeout: 12000 }).should('be.visible');
      cy.contains(/desbloquear/i, { timeout: 8000 }).should('be.visible').click();
      cy.contains(/ubs digital salvador/i, { timeout: 10000 }).should('be.visible');
    });

   it('Deve realizar logout corretamente', () => {
      // Clica no botão de logout usando data-testid
      cy.get('[data-testid="btn-logout"]').click({ force: true });
      cy.wait(1000);
      
      // Verifica se voltou para a tela de login
      cy.get('[data-testid="login-title"]', { timeout: 15000 }).should('be.visible');
      cy.contains(/ubs digital salvador/i).should('be.visible');});
  });
});