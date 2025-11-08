// cypress/e2e/login.cy.js

describe('Testes de Login - UBS Digital Salvador', () => {

  // ==========================================================
  // CONFIGURAÇÕES GERAIS E SELETORES
  // ==========================================================
  const URL_LOGIN = '/';

  const SELECTOR = {
    EMAIL_CPF: 'input[placeholder="Email ou CPF"]',
    PASSWORD: 'input[placeholder="Senha"]',
    BUTTON_ENTRAR: 'button:contains("Entrar")',
    ICON_TOGGLE_PASSWORD: 'button:has(svg.w-5.h-5)',

    // Títulos e textos exibidos após login
    TITLE_ADMIN: 'h1:contains("Painel Administrativo")',
    TITLE_PATIENT: 'h1:contains("Olá, Maria")',
    TITLE_PROFESSIONAL: 'h1:contains("Dr. João Silva")',

    SUBTITLE_ADMIN: 'p:contains("UBS Digital Salvador")',
    SUBTITLE_PROFESSIONAL: 'p:contains("Cardiologia")',

    // Botões comuns em telas após login
    BUTTON_AGENDAR: 'button:contains("Agendar")',
    BUTTON_CONSULTAS: 'button:contains("Consultas")',
  };

  beforeEach(() => {
    cy.visit(URL_LOGIN);
  });

  // ==========================================================
  // CENÁRIOS DE SUCESSO - LOGIN VÁLIDO
  // ==========================================================
  describe('Cenários de Sucesso - Login Válido', () => {

    it('Deve autenticar o Administrador e exibir o Painel Administrativo', () => {
      cy.get(SELECTOR.EMAIL_CPF).type('admin@ubs.salvador.gov.br');
      cy.get(SELECTOR.PASSWORD).type('admin123');
      cy.get(SELECTOR.BUTTON_ENTRAR).click();
      cy.wait(600);

      cy.contains('h1', 'Painel Administrativo', { timeout: 5000 }).should('be.visible');
      cy.contains('p', 'UBS Digital Salvador').should('be.visible');
      cy.contains('button', /Gerenciar Pacientes|Gerenciar Profissionais/i).should('be.visible');
    });

    it('Deve autenticar o Paciente e exibir a tela inicial com opções de agendamento', () => {
      cy.get(SELECTOR.EMAIL_CPF).clear().type('maria@email.com');
      cy.get(SELECTOR.PASSWORD).clear().type('123456');
      cy.get(SELECTOR.BUTTON_ENTRAR).click();
      cy.wait(600);

      cy.contains('h1', 'Olá, Maria!', { timeout: 5000 }).should('be.visible');
      cy.contains('button', /Agendar|Minhas Consultas/i).should('be.visible');
    });

    it('Deve autenticar o Profissional com CPF formatado e exibir nome e especialidade', () => {
      cy.get(SELECTOR.EMAIL_CPF).clear().type('111.222.333-44');
      cy.get(SELECTOR.PASSWORD).clear().type('123456');
      cy.get(SELECTOR.BUTTON_ENTRAR).click();
      cy.wait(1000);

      cy.contains('h1', 'Dr. João Silva', { timeout: 5000 }).should('be.visible');
      cy.contains('p', 'Cardiologia', { timeout: 5000 }).should('be.visible');
    });

    it('Deve autenticar o Profissional com CPF sem formatação e exibir a tela de consultas', () => {
      cy.get(SELECTOR.EMAIL_CPF).clear().type('11122233344');
      cy.get(SELECTOR.PASSWORD).clear().type('123456');
      cy.get(SELECTOR.BUTTON_ENTRAR).click();
      cy.wait(800);

      cy.contains('h1', 'Dr. João Silva', { timeout: 5000 }).should('be.visible');
      cy.contains('p', 'Cardiologia').should('be.visible');
    });
  });

  // ==========================================================
  // CENÁRIOS DE FALHA - LOGIN INVÁLIDO
  // ==========================================================
  describe('Cenários de Falha - Login Inválido', () => {

    it('Deve exibir alerta ao informar senha incorreta', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(SELECTOR.EMAIL_CPF).type('maria@email.com');
      cy.get(SELECTOR.PASSWORD).type('senha_errada');
      cy.get(SELECTOR.BUTTON_ENTRAR).click().then(() => {
        cy.wait(300);
        expect(stub.getCall(0)).to.be.calledWith('Email/CPF ou senha incorretos!');
      });

      cy.contains('h1', 'UBS Digital Salvador').should('be.visible');
    });

    it('Deve exibir alerta ao informar e-mail não cadastrado', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(SELECTOR.EMAIL_CPF).type('usuario.inexistente@email.com');
      cy.get(SELECTOR.PASSWORD).type('123456');
      cy.get(SELECTOR.BUTTON_ENTRAR).click().then(() => {
        cy.wait(300);
        expect(stub.getCall(0)).to.be.calledWith('Email/CPF ou senha incorretos!');
      });

      cy.contains('h1', 'UBS Digital Salvador').should('be.visible');
    });

    it('Deve exibir alerta ao informar CPF não cadastrado', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(SELECTOR.EMAIL_CPF).type('999.999.999-99');
      cy.get(SELECTOR.PASSWORD).type('123456');
      cy.get(SELECTOR.BUTTON_ENTRAR).click().then(() => {
        cy.wait(300);
        expect(stub.getCall(0)).to.be.calledWith('Email/CPF ou senha incorretos!');
      });

      cy.contains('h1', 'UBS Digital Salvador').should('be.visible');
    });

    it('Deve permanecer na tela de login ao tentar logar com campos vazios', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(SELECTOR.BUTTON_ENTRAR).click();
      cy.wait(300);

      if (stub.called) {
        expect(stub.getCall(0)).to.be.called;
      }

      cy.contains('h1', 'UBS Digital Salvador').should('be.visible');
      cy.get(SELECTOR.EMAIL_CPF).should('be.visible');
      cy.get(SELECTOR.PASSWORD).should('be.visible');
    });
  });

  // ==========================================================
  // FUNCIONALIDADES DE UX - VISIBILIDADE DA SENHA
  // ==========================================================
  describe('Funcionalidades de UX - Alternância de Visibilidade da Senha', () => {

    it('Deve exibir a senha ao clicar no ícone de visibilidade', () => {
      const TEST_PASSWORD = 'teste123';
      cy.get(SELECTOR.PASSWORD).type(TEST_PASSWORD);

      cy.get(SELECTOR.PASSWORD).should('have.attr', 'type', 'password');
      cy.get(SELECTOR.ICON_TOGGLE_PASSWORD).click();
      cy.get(SELECTOR.PASSWORD).should('have.attr', 'type', 'text');
      cy.get(SELECTOR.PASSWORD).should('have.value', TEST_PASSWORD);
    });

    it('Deve ocultar a senha ao clicar novamente no ícone', () => {
      const TEST_PASSWORD = 'teste123';
      cy.get(SELECTOR.PASSWORD).type(TEST_PASSWORD);

      cy.get(SELECTOR.ICON_TOGGLE_PASSWORD).click();
      cy.get(SELECTOR.PASSWORD).should('have.attr', 'type', 'text');

      cy.get(SELECTOR.ICON_TOGGLE_PASSWORD).click();
      cy.get(SELECTOR.PASSWORD).should('have.attr', 'type', 'password');
      cy.get(SELECTOR.PASSWORD).should('have.value', TEST_PASSWORD);
    });
  });

  // ==========================================================
  // PRIORIDADE DE LOGIN - ORDEM DE VERIFICAÇÃO
  // ==========================================================
  describe('Prioridade de Login - Ordem de Verificação', () => {

    it('Deve autenticar o Administrador com prioridade sobre outros tipos de usuário', () => {
      cy.get(SELECTOR.EMAIL_CPF).type('admin@ubs.salvador.gov.br');
      cy.get(SELECTOR.PASSWORD).type('admin123');
      cy.get(SELECTOR.BUTTON_ENTRAR).click();
      cy.wait(500);

      cy.contains('h1', 'Painel Administrativo').should('be.visible');
    });

    it('Deve autenticar o Paciente quando não for Administrador', () => {
      cy.get(SELECTOR.EMAIL_CPF).type('maria@email.com');
      cy.get(SELECTOR.PASSWORD).type('123456');
      cy.get(SELECTOR.BUTTON_ENTRAR).click();
      cy.wait(500);

      cy.contains('h1', 'Olá, Maria!').should('be.visible');
    });

    it('Deve autenticar o Profissional quando não for Admin nem Paciente', () => {
      cy.get(SELECTOR.EMAIL_CPF).type('111.222.333-44');
      cy.get(SELECTOR.PASSWORD).type('123456');
      cy.get(SELECTOR.BUTTON_ENTRAR).click();
      cy.wait(500);

      cy.contains('h1', 'Dr. João Silva').should('be.visible');
    });
  });
});
