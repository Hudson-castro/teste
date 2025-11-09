/// <reference types="cypress" />

describe('Gestão de Consultas - UBS Digital Salvador', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  // ==============================================================
  // AGENDAMENTO DE CONSULTA (PACIENTE)
  // ==============================================================
  context('Agendamento de Consultas', () => {

    beforeEach(() => {
      // Login como paciente
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('Deve agendar uma consulta com sucesso pelo fluxo completo', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.contains(/agendar consulta/i, { timeout: 5000 }).should('be.visible');

      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);

      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 7);
      const dataFormatada = dataFutura.toISOString().split('T')[0];
      cy.get('input[type="date"]').type(dataFormatada);
      cy.wait(500);

      cy.contains('button', '09:00').click();
      cy.wait(300);
      cy.contains('button', /confirmar agendamento/i).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains('Consulta agendada com sucesso');
      });
    });

    it('Deve validar seleção de data antes de mostrar horários', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);
      cy.contains(/horários disponíveis/i).should('not.exist');

      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 5);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.wait(500);
      cy.contains(/horários disponíveis/i).should('be.visible');
    });

    it('Deve permitir selecionar diferentes horários', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(200);
      cy.contains('button', /dra\. maria oliveira/i).click();
      cy.wait(200);

      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 3);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.wait(500);

      const horarios = ['09:00', '10:00', '14:00', '15:00'];
      horarios.forEach(horario => {
        cy.contains('button', horario).click();
        cy.contains('button', horario)
          .should('have.class', 'border-blue-500')
          .and('have.class', 'bg-blue-50');
      });
    });
  });

  // ==============================================================
  // LISTAGEM E FILTROS DE CONSULTAS
  // ==============================================================
  context('Listagem e Filtros de Consultas', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('Deve listar todas as consultas do paciente', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.contains(/consultas/i, { timeout: 5000 }).should('be.visible');
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').should('have.length.greaterThan', 0);
    });

    it('Deve filtrar consultas por status "Agendada"', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.contains('button', /agendada/i).click();
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').each(($el) => {
        cy.wrap($el).contains(/agendada/i).should('be.visible');
      });
    });

    it('Deve filtrar consultas por status "Realizada"', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.contains('button', /realizada/i).click();
      cy.get('.bg-green-100.text-green-700').should('be.visible');
    });

    it('Deve alternar entre diferentes filtros', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      const filtros = ['Todas', 'Agendada', 'Realizada', 'Cancelada'];
      filtros.forEach(filtro => {
        cy.contains('button', filtro).click();
        cy.contains('button', filtro)
          .should('have.class', 'bg-blue-600')
          .and('have.class', 'text-white');
      });
    });
  });

  // ==============================================================
  // AGENDAMENTO PELO ADMINISTRADOR
  // ==============================================================
  context('Agendamento pelo Admin', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('admin@ubs.salvador.gov.br');
      cy.get('[data-testid="input-password"]').clear().type('admin123');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('Admin deve conseguir agendar consulta para um paciente', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.contains(/selecione o paciente/i).should('be.visible');
      cy.contains('button', /maria silva santos/i).click();
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.contains('button', /dr\. joão silva/i).click();

      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 10);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.contains('button', '14:00').click();
      cy.contains('button', /confirmar agendamento/i).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains('Consulta agendada com sucesso');
      });
    });

    it('Deve validar fluxo sequencial do agendamento admin', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.contains(/selecione o paciente/i).should('be.visible');
      cy.contains('button', /joão oliveira costa/i).click();
      cy.contains(/selecione a ubs/i).should('be.visible');
    });
  });

  // ==============================================================
  // VALIDAÇÕES E REGRAS DE NEGÓCIO
  // ==============================================================
  context('Validações de Agendamento', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('Deve impedir seleção de data passada', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.contains('button', /dr\. joão silva/i).click();

      cy.get('input[type="date"]').invoke('attr', 'min').then(minDate => {
        const hoje = new Date().toISOString().split('T')[0];
        expect(minDate).to.equal(hoje);
      });
    });

    it('Deve exibir apenas profissionais da UBS selecionada', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.contains('button', /unidade básica de saúde da federação/i).click();

      cy.contains('button', /dr\. joão silva/i).should('be.visible');
      cy.contains('button', /dra\. maria oliveira/i).should('be.visible');
      cy.contains('button', /dr\. carlos souza/i).should('not.exist');
    });

    it('Botão de confirmar só deve aparecer após selecionar horário', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.contains('button', /dr\. joão silva/i).click();

      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 2);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.contains('button', /confirmar agendamento/i).should('not.exist');

      cy.contains('button', '10:00').click();
      cy.contains('button', /confirmar agendamento/i).should('be.visible');
    });
  });

  // ==============================================================
  //  CONSULTAS DO PROFISSIONAL
  // ==============================================================
  context('Visualização de Consultas pelo Profissional', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('111.222.333-44');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('Profissional deve ver suas consultas agendadas', () => {
      cy.contains(/dr\. joão silva/i).should('be.visible');
      cy.contains(/cardiologia/i).should('be.visible');
      cy.get('[data-testid="professional-scheduled-count"]').within(() => {
        cy.get('.text-2xl.font-bold').invoke('text').then(text => {
          const count = parseInt(text);
          expect(count).to.be.greaterThan(0);
        });
      });
    });

    it('Deve exibir lista de pacientes agendados', () => {
      cy.contains(/horários disponíveis/i).should('be.visible');
      cy.get('.bg-green-100.rounded-full').should('exist');
      cy.contains(/maria silva santos/i).should('be.visible');
    });

    it('Deve mostrar estatísticas corretas', () => {
      cy.get('[data-testid="professional-completed-count"]').within(() => {
        cy.contains(/realizadas/i).should('be.visible');
        cy.get('.text-2xl.font-bold').should('exist');
      });
    });
  });
});
