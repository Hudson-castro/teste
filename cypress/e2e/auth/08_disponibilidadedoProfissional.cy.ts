/// <reference types="cypress" />

describe('Disponibilidade Profissional - UBS Digital Salvador', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  // ==============================================================
  // VISUALIZAÇÃO DE HORÁRIOS - PROFISSIONAL
  // ==============================================================
  context('Dashboard do Profissional - Horários', () => {

    beforeEach(() => {
      cy.loginAsProfessional();
      cy.wait(1000);
    });

    it('Deve exibir a seção de Horários Disponíveis', () => {
      cy.contains(/horários disponíveis/i).should('be.visible');
    });

    it('Deve exibir o contador de consultas agendadas', () => {
      cy.get('[data-testid="professional-scheduled-count"]').should('be.visible');
      cy.get('[data-testid="professional-scheduled-count"]')
        .find('p.text-2xl')
        .invoke('text')
        .should('match', /\d+/);
    });

    it('Deve exibir o contador de consultas realizadas', () => {
      cy.get('[data-testid="professional-completed-count"]').should('be.visible');
      cy.get('[data-testid="professional-completed-count"]')
        .find('p.text-2xl')
        .invoke('text')
        .should('match', /\d+/);
    });

    it('Deve listar as consultas agendadas com pacientes', () => {
      cy.contains(/maria silva santos/i).should('be.visible');
    });

    it('Deve exibir data e horário das consultas agendadas', () => {
      // Verifica formato de data (YYYY-MM-DD)
      cy.contains(/\d{4}-\d{2}-\d{2}/i).should('be.visible');
      
      // Verifica formato de horário (HH:MM)
      cy.contains(/\d{2}:\d{2}/i).should('be.visible');
    });

    it('Deve exibir informações completas de cada consulta', () => {
      // Nome do paciente
      cy.get('.font-medium').should('have.length.greaterThan', 0);
      
      // Data e hora
      cy.get('.text-sm').should('have.length.greaterThan', 0);
    });
  });

  // ==============================================================
  // AGENDAMENTO - VERIFICAÇÃO DE DISPONIBILIDADE
  // ==============================================================
  context('Agendamento - Verificação de Horários', () => {

    beforeEach(() => {
      cy.loginAsPaciente();
      cy.wait(1000);
    });

    it('Deve acessar a tela de agendamento', () => {
      cy.get('[data-testid="btn-schedule"]').should('be.visible').click();
      cy.contains(/agendar consulta/i, { timeout: 10000 }).should('be.visible');
    });

    it('Deve selecionar uma UBS', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(1000);
      
      cy.contains(/selecione a ubs/i).should('be.visible');
      cy.contains(/federação/i).should('be.visible').click();
      cy.wait(500);
      
      cy.contains(/selecione o profissional/i, { timeout: 10000 }).should('be.visible');
    });

    it('Deve selecionar um profissional disponível', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(1000);
      
      // Seleciona UBS
      cy.contains(/federação/i).click();
      cy.wait(500);
      
      // Verifica se há profissionais disponíveis
      cy.contains(/dr.*joão silva/i).should('be.visible');
      cy.contains(/cardiologia/i).should('be.visible');
    });

    it('Deve exibir a disponibilidade de horários ao selecionar profissional', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(1000);
      
      // Seleciona UBS
      cy.contains(/federação/i).click();
      cy.wait(500);
      
      // Seleciona profissional
      cy.contains(/dr.*joão silva/i).click();
      cy.wait(500);
      
      // Seleciona data
      cy.get('input[type="date"]').should('be.visible').type('2025-12-01');
      cy.wait(500);
      
      // Verifica horários disponíveis
      cy.contains(/horários disponíveis/i, { timeout: 10000 }).should('be.visible');
      cy.contains('09:00').should('be.visible');
      cy.contains('10:00').should('be.visible');
    });

    it('Deve permitir selecionar um horário disponível', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(1000);
      
      cy.contains(/federação/i).click();
      cy.wait(500);
      
      cy.contains(/dr.*joão silva/i).click();
      cy.wait(500);
      
      cy.get('input[type="date"]').type('2025-12-01');
      cy.wait(500);
      
      // Clica em um horário
      cy.contains('button', '09:00').click();
      cy.wait(500);
      
      // Verifica que o botão de confirmar aparece
      cy.contains(/confirmar agendamento/i).should('be.visible');
    });

    it('Deve exibir múltiplos horários disponíveis', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(1000);
      
      cy.contains(/federação/i).click();
      cy.wait(500);
      
      cy.contains(/dr.*joão silva/i).click();
      cy.wait(500);
      
      cy.get('input[type="date"]').type('2025-12-15');
      cy.wait(1000);
      
      // Verifica se há pelo menos 3 horários
      cy.get('.grid button').should('have.length.greaterThan', 2);
    });

    it('Deve destacar visualmente o horário selecionado', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(1000);
      
      cy.contains(/federação/i).click();
      cy.wait(500);
      
      cy.contains(/dr.*joão silva/i).click();
      cy.wait(500);
      
      cy.get('input[type="date"]').type('2025-12-01');
      cy.wait(500);
      
      // Seleciona horário
      cy.contains('button', '09:00').click();
      
      // Verifica estilo do botão selecionado
      cy.contains('button', '09:00')
        .should('have.class', 'border-blue-500')
        .should('have.class', 'bg-blue-50');
    });
  });

  // ==============================================================
  // ADMIN - VISUALIZAÇÃO DE DISPONIBILIDADE
  // ==============================================================
  context('Admin - Verificação de Horários dos Profissionais', () => {

    beforeEach(() => {
      cy.loginAsAdmin();
      cy.wait(1000);
    });

    it('Deve visualizar profissionais e suas disponibilidades', () => {
      cy.get('[data-testid="btn-manage-professionals"]').click();
      cy.wait(1000);
      
      // Verifica informações de disponibilidade (se existir no sistema)
      cy.contains(/dr.*joão silva/i).should('be.visible');
      cy.contains(/cardiologia/i).should('be.visible');
    });

    it('Deve permitir admin agendar consulta verificando disponibilidade', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(1000);
      
      // Admin deve primeiro selecionar paciente
      cy.contains(/selecione o paciente/i).should('be.visible');
      cy.contains(/maria silva santos/i).should('be.visible').click();
      cy.wait(500);
      
      // Depois seleciona UBS
      cy.contains(/selecione a ubs/i).should('be.visible');
    });

    it('Deve verificar o total de consultas agendadas no sistema', () => {
      // Verifica se há informações no dashboard
      cy.get('[data-testid="admin-total-patients"]').should('be.visible');
      cy.get('[data-testid="admin-total-professionals"]').should('be.visible');
    });
  });
});