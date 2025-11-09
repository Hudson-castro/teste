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
      cy.get('[data-testid="admin-total-patients"]').invoke('text').should('match', /\d+/);
      cy.get('[data-testid="admin-total-professionals"]').invoke('text').should('match', /\d+/);
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
      cy.get('[data-testid="btn-schedule"]').should('be.visible');
      cy.get('[data-testid="btn-consultations"]').should('be.visible');
    });

    it('Deve exibir informações da próxima consulta', () => {
      cy.contains(/próxima consulta/i).should('be.visible');
      
      // Verifica se existe consulta agendada ou mensagem de "nenhuma consulta"
      cy.get('body').then($body => {
        if ($body.find('.bg-blue-100.rounded-full').length > 0) {
          // Tem consulta agendada
          cy.contains(/dr\.|dra\./i).should('be.visible');
          cy.contains(/cardiologia|ginecologia|pediatria/i).should('be.visible');
        } else {
          // Não tem consulta
          cy.contains(/nenhuma consulta agendada/i).should('be.visible');
        }
      });
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
      // Verifica contadores
      cy.get('[data-testid="professional-scheduled-count"]').should('be.visible');
      cy.get('[data-testid="professional-completed-count"]').should('be.visible');
      
      // Verifica que os números são válidos
      cy.get('[data-testid="professional-scheduled-count"]')
        .find('.text-2xl.font-bold')
        .invoke('text')
        .should('match', /\d+/);
    });

    it('Deve exibir os horários disponíveis', () => {
      cy.contains(/horários disponíveis/i).should('be.visible');
      
      // Verifica se existe alguma consulta listada
      cy.get('.bg-white.rounded-xl.shadow-sm.p-6').should('exist');
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
      // Clicar no botão de lock usando data-testid
      cy.get('[data-testid="btn-lock"]').click({ force: true });
      cy.wait(1000);
      
      // Verificar se a tela de bloqueio apareceu
      cy.contains(/app bloqueado/i, { timeout: 5000 }).should('be.visible');
      cy.get('[data-testid="btn-unlock"]').should('be.visible');
      
      // Digitar senha (qualquer senha serve)
      cy.get('input[type="password"]').type('senha123');
      
      // Desbloquear
      cy.get('[data-testid="btn-unlock"]').click();
      cy.wait(1000);
      
      // Verificar se voltou para o dashboard
      cy.contains(/painel administrativo|ubs digital salvador/i, { timeout: 10000 }).should('be.visible');
    });

    it('Deve realizar logout corretamente', () => {
      // Clicar no botão de logout usando data-testid
      cy.get('[data-testid="btn-logout"]').click({ force: true });
      cy.wait(1000);
      
      // Verificar se voltou para a tela de login
      cy.get('[data-testid="login-title"]', { timeout: 15000 }).should('be.visible');
      cy.contains(/ubs digital salvador/i).should('be.visible');
      cy.contains(/sistema de agendamento/i).should('be.visible');
    });
  });

  // ==============================================================
  // TESTES ADICIONAIS - NAVEGAÇÃO
  // ==============================================================
  context('Navegação no Dashboard', () => {

    it('Admin deve conseguir navegar entre as telas principais', () => {
      cy.loginAsAdmin();
      cy.wait(500);

      // Navegar para Gerenciar Pacientes
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(300);
      cy.contains(/gerenciar pacientes/i).should('be.visible');

      // Voltar ao dashboard
      cy.get('button').first().click(); // Botão de voltar (ArrowLeft)
      cy.wait(300);
      cy.contains(/painel administrativo/i).should('be.visible');

      // Navegar para Gerenciar Profissionais
      cy.get('[data-testid="btn-manage-professionals"]').click();
      cy.wait(300);
      cy.contains(/gerenciar profissionais/i).should('be.visible');
    });

    it('Paciente deve conseguir navegar usando bottom navigation', () => {
      cy.loginAsPaciente();
      cy.wait(500);

      // Navegar para Agendamento
      cy.get('[data-testid="nav-schedule"]').click();
      cy.wait(300);
      cy.contains(/agendar consulta|selecione/i).should('be.visible');

      // Navegar para Consultas
      cy.get('[data-testid="nav-consultations"]').click();
      cy.wait(300);
      cy.contains(/consultas/i).should('be.visible');

      // Voltar para Home
      cy.get('[data-testid="nav-home"]').click();
      cy.wait(300);
      cy.contains(/olá, maria/i).should('be.visible');
    });
  });

  // ==============================================================
  // TESTES DE ESTATÍSTICAS
  // ==============================================================
  context('Estatísticas do Dashboard', () => {

    it('Dashboard do Admin deve mostrar estatísticas corretas', () => {
      cy.loginAsAdmin();
      cy.wait(500);

      // Verificar contador de pacientes
      cy.get('[data-testid="admin-total-patients"]')
        .invoke('text')
        .then(text => {
          const count = parseInt(text);
          expect(count).to.be.at.least(2); // Temos 2 pacientes cadastrados
        });

      // Verificar contador de profissionais
      cy.get('[data-testid="admin-total-professionals"]')
        .invoke('text')
        .then(text => {
          const count = parseInt(text);
          expect(count).to.be.at.least(3); // Temos 3 profissionais cadastrados
        });
    });

    it('Dashboard do Profissional deve mostrar consultas agendadas', () => {
      cy.loginAsProfessional();
      cy.wait(500);

      // Verificar contador de agendadas
      cy.get('[data-testid="professional-scheduled-count"]')
        .find('.text-2xl.font-bold')
        .invoke('text')
        .then(text => {
          const count = parseInt(text);
          expect(count).to.be.at.least(0);
        });

      // Verificar contador de realizadas
      cy.get('[data-testid="professional-completed-count"]')
        .find('.text-2xl.font-bold')
        .invoke('text')
        .then(text => {
          const count = parseInt(text);
          expect(count).to.be.at.least(0);
        });
    });
  });
});