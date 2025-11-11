/// <reference types="cypress" />

describe('Agendamento de Consultas - UBS Digital Salvador', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  // ==============================================================
  // AGENDAMENTO PELO PACIENTE
  // ==============================================================
  context('Agendamento pelo Paciente', () => {

    beforeEach(() => {
      // Login como paciente Maria
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
      cy.contains(/olá, maria/i).should('be.visible');
    });

    it(' Deve realizar agendamento completo com sucesso', () => {
      // 1. Acessar tela de agendamento
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);
      cy.contains(/agendar consulta/i).should('be.visible');

      // 2. Selecionar UBS
      cy.contains(/selecione a ubs/i).should('be.visible');
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(500);

      // 3. Selecionar Profissional
      cy.contains(/selecione o profissional/i).should('be.visible');
      cy.contains('button', /dr\. joão silva/i).should('be.visible');
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(500);

      // 4. Selecionar Data (7 dias no futuro)
      cy.contains(/selecione a data/i).should('be.visible');
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 7);
      const dataFormatada = dataFutura.toISOString().split('T')[0];
      
      cy.get('input[type="date"]').type(dataFormatada);
      cy.wait(500);

      // 5. Selecionar Horário
      cy.contains(/horários disponíveis/i).should('be.visible');
      cy.contains('button', '09:00').should('be.visible');
      cy.contains('button', '09:00').click();
      cy.wait(300);

      // 6. Confirmar Agendamento
      cy.contains('button', /confirmar agendamento/i).should('be.visible');
      cy.contains('button', /confirmar agendamento/i).click();
      
      // 7. Verificar mensagem de sucesso
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Consulta agendada com sucesso');
      });

      // 8. Verificar retorno ao dashboard
      cy.wait(1000);
      cy.contains(/olá, maria/i, { timeout: 5000 }).should('be.visible');
    });

    it('Deve validar sequência correta do fluxo de agendamento', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Etapa 1: Deve começar com seleção de UBS
      cy.contains(/selecione a ubs/i).should('be.visible');
      cy.contains(/selecione o profissional/i).should('not.exist');
      cy.contains(/selecione a data/i).should('not.exist');

      // Selecionar UBS
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(500);

      // Etapa 2: Agora deve mostrar profissionais
      cy.contains(/selecione o profissional/i).should('be.visible');
      cy.contains(/selecione a data/i).should('not.exist');

      // Selecionar Profissional
      cy.contains('button', /dra\. maria oliveira/i).click();
      cy.wait(500);

      // Etapa 3: Agora deve mostrar calendário
      cy.contains(/selecione a data/i).should('be.visible');
      cy.get('input[type="date"]').should('be.visible');
      cy.contains(/horários disponíveis/i).should('not.exist');
    });

    it('Deve filtrar profissionais pela UBS selecionada', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Selecionar UBS da Federação (unitId: 2)
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(500);

      // Verificar profissionais desta UBS
      cy.contains('button', /dr\. joão silva/i).should('be.visible'); // unitId: 2
      cy.contains('button', /dra\. maria oliveira/i).should('be.visible'); // unitId: 2
      
      // Profissional de outra UBS não deve aparecer
      cy.contains('button', /dr\. carlos souza/i).should('not.exist'); // unitId: 3
    });

    it('Deve impedir seleção de data passada', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Completar fluxo até data
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);

      // Verificar atributo min do input
      const hoje = new Date().toISOString().split('T')[0];
      cy.get('input[type="date"]')
        .should('have.attr', 'min', hoje);
    });

    it('Deve exibir horários apenas após selecionar data', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Completar fluxo
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);

      // Antes de selecionar data
      cy.contains(/horários disponíveis/i).should('not.exist');

      // Selecionar data
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 3);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.wait(500);

      // Agora horários devem aparecer
      cy.contains(/horários disponíveis/i).should('be.visible');
      cy.contains('button', '09:00').should('be.visible');
      cy.contains('button', '10:00').should('be.visible');
      cy.contains('button', '14:00').should('be.visible');
    });

    it('Deve destacar horário selecionado', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Fluxo completo até horários
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dra\. maria oliveira/i).click();
      cy.wait(300);
      
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 5);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.wait(500);

      // Clicar no horário 10:00
      cy.contains('button', '10:00').click();
      cy.wait(200);

      // Verificar classes de destaque
      cy.contains('button', '10:00')
        .should('have.class', 'border-blue-500')
        .and('have.class', 'bg-blue-50');

      // Clicar em outro horário
      cy.contains('button', '14:00').click();
      cy.wait(200);

      // Novo horário deve estar destacado
      cy.contains('button', '14:00')
        .should('have.class', 'border-blue-500')
        .and('have.class', 'bg-blue-50');
    });

    it('Botão confirmar só deve aparecer após selecionar horário', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Fluxo até horários
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);
      
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 4);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.wait(500);

      // Antes de selecionar horário
      cy.contains('button', /confirmar agendamento/i).should('not.exist');

      // Selecionar horário
      cy.contains('button', '15:00').click();
      cy.wait(300);

      // Agora botão deve aparecer
      cy.contains('button', /confirmar agendamento/i).should('be.visible');
    });

    it('Deve permitir navegar para trás no fluxo', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Avançar no fluxo
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);

      // Clicar em voltar
      cy.get('button').first().click(); // ArrowLeft
      cy.wait(500);

      // Deve voltar ao dashboard
      cy.contains(/olá, maria/i).should('be.visible');
    });
  });

  // ==============================================================
  // AGENDAMENTO PELO ADMINISTRADOR
  // ==============================================================
  context('Agendamento pelo Administrador', () => {

    beforeEach(() => {
      // Login como admin
      cy.get('[data-testid="input-email"]').clear().type('admin@ubs.salvador.gov.br');
      cy.get('[data-testid="input-password"]').clear().type('admin123');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
      cy.contains(/painel administrativo/i).should('be.visible');
    });

    it('Admin deve conseguir agendar para um paciente', () => {
      // 1. Acessar agendamento
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // 2. Selecionar Paciente (passo extra do admin)
      cy.contains(/selecione o paciente/i).should('be.visible');
      cy.contains('button', /maria silva santos/i).click();
      cy.wait(500);

      // 3. Selecionar UBS
      cy.contains(/selecione a ubs/i).should('be.visible');
      cy.contains('button', /unidade de saúde da família são marcos/i).click();
      cy.wait(500);

      // 4. Selecionar Profissional
      cy.contains(/selecione o profissional/i).should('be.visible');
      cy.contains('button', /dr\. carlos souza/i).click();
      cy.wait(500);

      // 5. Selecionar Data
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 10);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.wait(500);

      // 6. Selecionar Horário
      cy.contains('button', '11:00').click();
      cy.wait(300);

      // 7. Confirmar
      cy.contains('button', /confirmar agendamento/i).click();
      
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Consulta agendada com sucesso');
      });
    });

    it('Deve validar fluxo sequencial do admin', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Etapa 1: Seleção de paciente
      cy.contains(/selecione o paciente/i).should('be.visible');
      cy.contains(/selecione a ubs/i).should('not.exist');

      // Selecionar paciente
      cy.contains('button', /joão oliveira costa/i).click();
      cy.wait(500);

      // Etapa 2: Seleção de UBS
      cy.contains(/selecione a ubs/i).should('be.visible');
      cy.contains(/selecione o profissional/i).should('not.exist');

      // Selecionar UBS
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(500);

      // Etapa 3: Seleção de profissional
      cy.contains(/selecione o profissional/i).should('be.visible');
      cy.contains(/selecione a data/i).should('not.exist');
    });

    it('Admin deve ver todos os pacientes disponíveis', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Verificar lista de pacientes
      cy.contains(/selecione o paciente/i).should('be.visible');
      cy.contains('button', /maria silva santos/i).should('be.visible');
      cy.contains('button', /joão oliveira costa/i).should('be.visible');
    });

    it('Admin deve poder agendar para diferentes pacientes', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Selecionar João
      cy.contains('button', /joão oliveira costa/i).click();
      cy.wait(500);

      // Verificar que avançou
      cy.contains(/selecione a ubs/i).should('be.visible');
      cy.contains(/selecione o paciente/i).should('not.exist');
    });
  });

  // ==============================================================
  // VALIDAÇÕES DE DADOS NO AGENDAMENTO
  // ==============================================================
  context('Validações de Dados', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('Deve exibir informações corretas da UBS', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Verificar informações da UBS
      cy.contains('button', /centro de saúde dr\. eduardo r\. baia/i).within(() => {
        cy.contains(/centro - salvador/i).should('be.visible');
      });

      cy.contains('button', /unidade básica de saúde da federação/i).within(() => {
        cy.contains(/federação - salvador/i).should('be.visible');
      });
    });

    it('Deve exibir especialidade do profissional', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Selecionar UBS
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(500);

      // Verificar especialidades
      cy.contains('button', /dr\. joão silva/i).within(() => {
        cy.contains(/cardiologia/i).should('be.visible');
      });

      cy.contains('button', /dra\. maria oliveira/i).within(() => {
        cy.contains(/ginecologia/i).should('be.visible');
      });
    });

    it('Deve exibir todos os horários disponíveis', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Completar fluxo
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);
      
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 6);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.wait(500);

      // Verificar horários
      const horariosEsperados = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
      horariosEsperados.forEach(horario => {
        cy.contains('button', horario).should('be.visible');
      });
    });
  });

  // ==============================================================
  // NAVEGAÇÃO E CANCELAMENTO
  // ==============================================================
  context('Navegação e Cancelamento', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('Deve poder voltar ao dashboard a qualquer momento', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Avançar no fluxo
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);

      // Clicar em voltar
      cy.get('button').first().click();
      cy.wait(500);

      // Verificar retorno
      cy.contains(/olá, maria/i).should('be.visible');
      cy.get('[data-testid="btn-schedule"]').should('be.visible');
    });

    it('Deve poder usar navegação bottom durante agendamento', () => {
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Avançar um pouco
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);

      // Usar bottom navigation
      cy.get('[data-testid="nav-home"]').click();
      cy.wait(300);

      // Verificar retorno ao dashboard
      cy.contains(/olá, maria/i).should('be.visible');
    });

    it('Deve limpar seleções ao sair do agendamento', () => {
      // Primeiro agendamento parcial
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);

      // Voltar
      cy.get('button').first().click();
      cy.wait(500);

      // Entrar novamente
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      // Deve começar do início
      cy.contains(/selecione a ubs/i).should('be.visible');
      cy.contains(/selecione o profissional/i).should('not.exist');
    });
  });

  // ==============================================================
  // INTEGRAÇÃO COM LISTA DE CONSULTAS
  // ==============================================================
  context('Integração com Lista de Consultas', () => {

    it('Consulta agendada deve aparecer na lista', () => {
      // Login
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      // Realizar agendamento completo
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);
      
      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);
      
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 8);
      const dataFormatada = dataFutura.toISOString().split('T')[0];
      cy.get('input[type="date"]').type(dataFormatada);
      cy.wait(500);
      
      cy.contains('button', '14:00').click();
      cy.wait(300);
      cy.contains('button', /confirmar agendamento/i).click();
      
      cy.on('window:alert', (text) => {
        expect(text).to.contains('sucesso');
      });

      cy.wait(1000);

      // Ir para lista de consultas
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar que consulta aparece
      cy.contains(/dr\. joão silva/i).should('be.visible');
      cy.contains(/cardiologia/i).should('be.visible');
      cy.contains(/agendada/i).should('be.visible');
    });

    it('Consulta agendada deve aparecer no dashboard', () => {
      // Login
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      // Verificar seção de próxima consulta
      cy.contains(/próxima consulta/i).should('be.visible');

      // Se houver consultas, deve mostrar informações
      cy.get('body').then($body => {
        if ($body.find('.bg-blue-100.rounded-full').length > 0) {
          cy.contains(/dr\.|dra\./i).should('be.visible');
          cy.contains(/agendada/i).should('be.visible');
        }
      });
    });
  });
});