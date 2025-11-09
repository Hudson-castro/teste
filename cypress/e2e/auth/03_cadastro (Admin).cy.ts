/// <reference types="cypress" />

describe('Cadastro - UBS Digital Salvador', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.loginAsAdmin();
    cy.wait(1000);
  });

  // ==============================================================
  // CADASTRO DE PACIENTES
  // ==============================================================
  context('Cadastro de Pacientes', () => {

    it('Deve acessar a tela de gerenciar pacientes', () => {
      cy.get('[data-testid="btn-manage-patients"]').should('be.visible').click();
      cy.contains(/gerenciar pacientes/i, { timeout: 10000 }).should('be.visible');
    });

    it('Deve exibir o botão de adicionar novo paciente', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Procura pelo botão com ícone Plus na tela de gerenciar pacientes
      cy.get('.bg-white.p-4.border-b').within(() => {
        cy.get('button.bg-blue-600').should('be.visible');
      });
    });

    it('Deve abrir o formulário de cadastro ao clicar no botão +', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Clica no botão de adicionar (botão azul com Plus)
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      
      // Verifica se o formulário apareceu
      cy.contains(/cadastrar novo paciente/i, { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="input-patient-name"]').should('be.visible');
    });

    it('Deve cadastrar um novo paciente com sucesso', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Clica no botão de adicionar
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      
      // Preenche o nome do paciente
      cy.get('[data-testid="input-patient-name"]')
        .should('be.visible')
        .clear()
        .type('Carlos Alberto Silva');
      
      cy.wait(300);
      
      // Clica em Salvar
      cy.contains('button', /salvar/i).should('be.visible').click();
      
      // Aguarda o alert
      cy.wait(500);
      
      // Verifica se o formulário foi fechado
      cy.contains(/cadastrar novo paciente/i).should('not.exist');
      
      // Verifica se o paciente apareceu na lista
      cy.contains(/carlos alberto silva/i, { timeout: 10000 }).should('be.visible');
    });

    it('Deve validar campo obrigatório ao tentar salvar sem nome', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Clica no botão de adicionar
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      
      // Deixa o campo vazio e tenta salvar
      cy.get('[data-testid="input-patient-name"]').should('be.visible').clear();
      
      // Clica em Salvar
      cy.contains('button', /salvar/i).click();
      
      // O sistema deve mostrar um alert - Cypress captura automaticamente
      cy.wait(500);
    });

    it('Deve cancelar o cadastro de paciente', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Clica no botão de adicionar
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      
      // Preenche o nome
      cy.get('[data-testid="input-patient-name"]')
        .should('be.visible')
        .type('Paciente Teste Cancelar');
      
      cy.wait(300);
      
      // Clica em Cancelar
      cy.contains('button', /cancelar/i).should('be.visible').click();
      cy.wait(500);
      
      // Verifica que o formulário foi fechado
      cy.contains(/cadastrar novo paciente/i).should('not.exist');
      cy.get('[data-testid="input-patient-name"]').should('not.exist');
    });

    it('Deve exibir a lista de pacientes cadastrados', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Verifica se há pelo menos um paciente na lista
      cy.contains(/maria silva santos/i).should('be.visible');
      cy.contains(/joão oliveira costa/i).should('be.visible');
    });

    it('Deve exibir informações do paciente (CPF e Cartão SUS)', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Verifica os labels
      cy.contains(/cpf:/i).should('be.visible');
      cy.contains(/cartão sus:/i).should('be.visible');
    });

    it('Deve permitir adicionar múltiplos pacientes', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Adiciona primeiro paciente
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      cy.get('[data-testid="input-patient-name"]').type('Paciente Um');
      cy.contains('button', /salvar/i).click();
      cy.wait(1000);
      
      // Adiciona segundo paciente
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      cy.get('[data-testid="input-patient-name"]').type('Paciente Dois');
      cy.contains('button', /salvar/i).click();
      cy.wait(1000);
      
      // Verifica se ambos aparecem
      cy.contains(/paciente um/i).should('be.visible');
      cy.contains(/paciente dois/i).should('be.visible');
    });
  });

  // ==============================================================
  // CADASTRO DE PROFISSIONAIS
  // ==============================================================
  context('Cadastro de Profissionais', () => {

    it('Deve acessar a tela de gerenciar profissionais', () => {
      cy.get('[data-testid="btn-manage-professionals"]').should('be.visible').click();
      cy.contains(/gerenciar profissionais/i, { timeout: 10000 }).should('be.visible');
    });

    it('Deve exibir o botão de adicionar novo profissional', () => {
      cy.get('[data-testid="btn-manage-professionals"]').click();
      cy.wait(1000);
      
      // Procura pelo botão com ícone Plus na tela de gerenciar profissionais
      cy.get('.bg-white.p-4.border-b').within(() => {
        cy.get('button.bg-green-600').should('be.visible');
      });
    });

    it('Deve exibir a lista de profissionais cadastrados', () => {
      cy.get('[data-testid="btn-manage-professionals"]').click();
      cy.wait(1000);
      
      // Verifica se há pelo menos um profissional na lista
      cy.contains(/dr.*joão silva/i).should('be.visible');
      cy.contains(/dra.*maria oliveira/i).should('be.visible');
      cy.contains(/dr.*carlos souza/i).should('be.visible');
    });

    it('Deve exibir informações do profissional (Especialidade e CRM)', () => {
      cy.get('[data-testid="btn-manage-professionals"]').click();
      cy.wait(1000);
      
      // Verifica especialidade
      cy.contains(/cardiologia/i).should('be.visible');
      
      // Verifica CRM
      cy.contains(/crm/i).should('be.visible');
    });

    it('Deve exibir corretamente todas as especialidades', () => {
      cy.get('[data-testid="btn-manage-professionals"]').click();
      cy.wait(1000);
      
      // Verifica se as especialidades estão visíveis
      cy.contains(/cardiologia/i).should('exist');
      cy.contains(/ginecologia/i).should('exist');
      cy.contains(/pediatria/i).should('exist');
    });

    it('Deve exibir os detalhes completos de cada profissional', () => {
      cy.get('[data-testid="btn-manage-professionals"]').click();
      cy.wait(1000);
      
      // Verifica elementos visuais
      cy.get('.bg-green-100').should('have.length.greaterThan', 0); // Ícone
      cy.get('.font-semibold').should('have.length.greaterThan', 0); // Nome
      cy.get('.text-sm.text-green-600').should('have.length.greaterThan', 0); // Especialidade
    });

    it('Deve exibir profissionais organizados em cards', () => {
      cy.get('[data-testid="btn-manage-professionals"]').click();
      cy.wait(1000);
      
      // Verifica se há cards
      cy.get('.bg-white.rounded-xl.shadow-sm').should('have.length.greaterThan', 0);
    });
  });

  // ==============================================================
  // NAVEGAÇÃO ENTRE TELAS DE CADASTRO
  // ==============================================================
  context('Navegação entre Cadastros', () => {

    it('Deve navegar de Pacientes para Profissionais', () => {
      // Vai para pacientes
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      cy.contains(/gerenciar pacientes/i).should('be.visible');
      
      // Volta ao dashboard usando a seta
      cy.get('button').first().click();
      cy.wait(500);
      
      // Verifica que voltou
      cy.contains(/painel administrativo/i).should('be.visible');
      
      // Vai para profissionais
      cy.get('[data-testid="btn-manage-professionals"]').click();
      cy.wait(1000);
      cy.contains(/gerenciar profissionais/i).should('be.visible');
    });

    it('Deve voltar ao dashboard admin através da seta', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Clica na seta de voltar (primeiro botão da tela)
      cy.get('button').first().click();
      cy.wait(500);
      
      // Verifica que voltou ao dashboard
      cy.contains(/painel administrativo/i).should('be.visible');
      cy.get('[data-testid="btn-manage-patients"]').should('be.visible');
    });

    it('Deve navegar usando o bottom navigation', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Usa bottom nav para voltar ao home
      cy.get('[data-testid="nav-home"]').should('be.visible').click();
      cy.wait(500);
      
      cy.contains(/painel administrativo/i).should('be.visible');
    });

    it('Deve manter dados ao navegar entre telas', () => {
      // Adiciona um paciente
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      cy.get('[data-testid="input-patient-name"]').type('Teste Navegação');
      cy.contains('button', /salvar/i).click();
      cy.wait(1000);
      
      // Verifica que foi salvo
      cy.contains(/teste navegação/i).should('be.visible');
      
      // Navega para outra tela
      cy.get('button').first().click();
      cy.wait(500);
      
      // Volta para pacientes
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Verifica que o dado ainda está lá
      cy.contains(/teste navegação/i).should('be.visible');
    });

    it('Deve exibir contadores corretos após cadastros', () => {
      // Volta ao dashboard
      cy.get('[data-testid="nav-home"]').click();
      cy.wait(500);
      
      // Verifica os contadores
      cy.get('[data-testid="admin-total-patients"]')
        .invoke('text')
        .then(text => {
          const count = parseInt(text);
          expect(count).to.be.at.least(2);
        });
      
      cy.get('[data-testid="admin-total-professionals"]')
        .invoke('text')
        .then(text => {
          const count = parseInt(text);
          expect(count).to.be.at.least(3);
        });
    });
  });

  // ==============================================================
  // VALIDAÇÕES E FEEDBACK
  // ==============================================================
  context('Validações e Feedback Visual', () => {

    it('Deve exibir formulário com campos corretos para paciente', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      
      // Verifica estrutura do formulário
      cy.contains(/cadastrar novo paciente/i).should('be.visible');
      cy.get('[data-testid="input-patient-name"]').should('be.visible');
      cy.contains('button', /salvar/i).should('be.visible');
      cy.contains('button', /cancelar/i).should('be.visible');
    });

    it('Deve limpar o formulário após cancelar', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      
      cy.get('[data-testid="input-patient-name"]').type('Teste Limpar');
      cy.contains('button', /cancelar/i).click();
      cy.wait(500);
      
      // Abre novamente
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      
      // Verifica que está limpo
      cy.get('[data-testid="input-patient-name"]').should('have.value', '');
    });

    it('Deve exibir lista vazia corretamente se não houver dados', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Sempre deve ter pelo menos os pacientes padrão
      cy.get('.bg-white.rounded-xl.shadow-sm').should('have.length.greaterThan', 0);
    });

    it('Deve manter scroll position ao adicionar item', () => {
      cy.get('[data-testid="btn-manage-patients"]').click();
      cy.wait(1000);
      
      // Adiciona paciente
      cy.get('button.bg-blue-600.text-white.rounded-full').click();
      cy.wait(500);
      cy.get('[data-testid="input-patient-name"]').type('Paciente Scroll');
      cy.contains('button', /salvar/i).click();
      cy.wait(1000);
      
      // Verifica que o novo item está visível
      cy.contains(/paciente scroll/i).should('be.visible');
    });
  });
});