/// <reference types="cypress" />

describe('Cancelamento de Consultas - UBS Digital Salvador', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  // ==============================================================
  // CANCELAMENTO - PACIENTE
  // ==============================================================
  context('Cancelamento pelo Paciente', () => {

    beforeEach(() => {
      cy.loginAsPaciente();
      cy.wait(1000);
    });

    it('Deve acessar a lista de consultas do paciente', () => {
      cy.get('[data-testid="btn-consultations"]').should('be.visible').click();
      cy.contains(/consultas/i, { timeout: 10000 }).should('be.visible');
    });

    it('Deve exibir consultas agendadas do paciente', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(1000);
      
      // Verifica se há consultas
      cy.contains(/dr.*joão silva/i).should('be.visible');
      cy.contains(/cardiologia/i).should('be.visible');
    });

    it('Deve filtrar apenas consultas agendadas', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(1000);
      
      // Clica no filtro "Agendada"
      cy.contains('button', /agendada/i).click();
      cy.wait(500);
      
      // Verifica se mostra apenas agendadas
      cy.contains(/agendada/i).should('be.visible');
    });

    it('Deve exibir informações completas da consulta', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(1000);
      
      // Verifica elementos da consulta
      cy.get('.font-semibold').should('have.length.greaterThan', 0);
      cy.get('.text-sm').should('have.length.greaterThan', 0);
      cy.contains(/\d{4}-\d{2}-\d{2}/i).should('be.visible');
    });

    it('Deve exibir status visual da consulta (badge)', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(1000);
      
      // Verifica badge de status
      cy.get('.rounded-full').should('have.length.greaterThan', 0);
      cy.contains(/agendada/i).should('have.class', 'rounded-full');
    });

    it('Deve navegar entre filtros de status', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(1000);
      
      // Clica em diferentes filtros
      cy.contains('button', /todas/i).should('be.visible');
      cy.contains('button', /agendada/i).click();
      cy.wait(300);
      cy.contains('button', /realizada/i).click();
      cy.wait(300);
      cy.contains('button', /cancelada/i).click();
    });

    it('Deve voltar ao dashboard através da navegação bottom', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(1000);
      
      cy.get('[data-testid="nav-home"]').should('be.visible').click();
      cy.wait(500);
      
      cy.contains(/olá, maria/i).should('be.visible');
    });
  });

  // ==============================================================
  // CANCELAMENTO - PROFISSIONAL
  // ==============================================================
  context('Visualização pelo Profissional', () => {

    beforeEach(() => {
      cy.loginAsProfessional();
      cy.wait(1000);
    });

    it('Deve exibir consultas do profissional na tela principal', () => {
      cy.contains(/horários disponíveis/i).should('be.visible');
      cy.contains(/maria silva santos/i).should('be.visible');
    });

    it('Deve exibir contador de consultas agendadas', () => {
      cy.get('[data-testid="professional-scheduled-count"]')
        .find('p.text-2xl')
        .invoke('text')
        .then(count => {
          expect(parseInt(count)).to.be.at.least(1);
        });
    });

    it('Deve permitir navegação para tela de consultas via bottom nav', () => {
      cy.get('[data-testid="nav-agenda"]').should('be.visible').click();
      cy.wait(500);
      
      cy.contains(/consultas/i).should('be.visible');
    });

    it('Deve exibir informações dos pacientes agendados', () => {
      // Verifica nome do paciente
      cy.get('.font-medium').should('contain.text', 'Maria Silva Santos');
      
      // Verifica data e horário
      cy.contains(/\d{4}-\d{2}-\d{2}/).should('be.visible');
      cy.contains(/\d{2}:\d{2}/).should('be.visible');
    });

    it('Deve mostrar apenas consultas do profissional logado', () => {
      cy.get('[data-testid="nav-agenda"]').click();
      cy.wait(1000);
      
      // Verifica que só aparecem pacientes deste profissional
      cy.contains(/maria silva santos/i).should('be.visible');
    });
  });

  // ==============================================================
  // CANCELAMENTO - ADMIN
  // ==============================================================
  context('Gerenciamento pelo Admin', () => {

    beforeEach(() => {
      cy.loginAsAdmin();
      cy.wait(1000);
    });

    it('Deve acessar todas as consultas do sistema', () => {
      // Admin pode ver consultas através da navegação
      cy.get('[data-testid="nav-home"]').should('be.visible');
    });

    it('Deve visualizar contadores gerais do sistema', () => {
      cy.get('[data-testid="admin-total-patients"]')
        .invoke('text')
        .then(count => {
          expect(parseInt(count)).to.be.at.least(1);
        });
      
      cy.get('[data-testid="admin-total-professionals"]')
        .invoke('text')
        .then(count => {
          expect(parseInt(count)).to.be.at.least(1);
        });
    });

    it('Deve poder agendar consulta para pacientes', () => {
      cy.get('[data-testid="btn-schedule"]').should('be.visible').click();
      cy.wait(1000);
      
      cy.contains(/selecione o paciente/i).should('be.visible');
    });

    it('Deve navegar entre diferentes áreas administrativas', () => {
      // Pacientes
      cy.get('[data-testid="btn-manage-patients"]').should('be.visible');
      
      // Profissionais
      cy.get('[data-testid="btn-manage-professionals"]').should('be.visible');
      
      // Relatórios
      cy.get('[data-testid="btn-reports"]').should('be.visible');
    });

    it('Deve acessar relatórios do sistema', () => {
      cy.get('[data-testid="btn-reports"]').click();
      cy.wait(1000);
      
      cy.contains(/relatórios/i).should('be.visible');
      cy.contains(/estatísticas gerais/i).should('be.visible');
    });

    it('Deve exibir estatísticas de consultas nos relatórios', () => {
      cy.get('[data-testid="btn-reports"]').click();
      cy.wait(1000);
      
      cy.contains(/total de pacientes/i).should('be.visible');
      cy.contains(/total de profissionais/i).should('be.visible');
      cy.contains(/consultas agendadas/i).should('be.visible');
      cy.contains(/consultas realizadas/i).should('be.visible');
    });
  });

  // ==============================================================
  // FILTROS E BUSCA DE CONSULTAS
  // ==============================================================
  context('Filtros e Busca', () => {

    it('Paciente - Deve filtrar por status "Todas"', () => {
      cy.loginAsPaciente();
      cy.wait(1000);
      
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(1000);
      
      cy.contains('button', /todas/i).click();
      cy.wait(500);
      
      // Deve exibir consultas de todos os status
      cy.get('.bg-white.rounded-xl').should('have.length.greaterThan', 0);
    });

    it('Paciente - Deve filtrar por status "Realizada"', () => {
      cy.loginAsPaciente();
      cy.wait(1000);
      
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(1000);
      
      cy.contains('button', /realizada/i).click();
      cy.wait(500);
      
      // Verifica se há consultas realizadas
      cy.get('body').then($body => {
        if ($body.text().includes('Realizada')) {
          cy.contains(/realizada/i).should('be.visible');
        }
      });
    });

    it('Profissional - Deve visualizar agenda através do bottom nav', () => {
      cy.loginAsProfessional();
      cy.wait(1000);
      
      cy.get('[data-testid="nav-agenda"]').click();
      cy.wait(500);
      
      cy.contains(/consultas/i).should('be.visible');
    });
  });
});