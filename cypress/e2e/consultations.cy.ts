// cypress/e2e/consultations.cy.ts

describe('Consultation Management Tests', () => {
  // Faz login como paciente antes de cada teste de consulta
  beforeEach(() => {
    cy.loginAsPatient();
    // Navega para a tela de consultas do paciente, se houver uma rota específica.
    // Como a aplicação é single-page e controla o estado com React,
    // podemos precisar simular a navegação interna ou garantir que os elementos estejam visíveis.
    // Com base no componente, a tela inicial do paciente já exibe "Próxima Consulta".
    // Se houver um botão para "Minhas Consultas", descomente a linha abaixo e ajuste o seletor:
    // cy.get('[data-cy="my-consultations-button"]').click();
  });

  it('Should display upcoming patient consultations', () => {
    cy.contains('Próxima Consulta').should('be.visible');
    // Verifica se a consulta da Maria (paciente padrão) com Dr. João Silva está visível
    cy.contains('Dr. João Silva').should('be.visible');
    cy.contains('15/10/2024').should('be.visible'); // Formato da data pode variar
    cy.contains('09:00').should('be.visible');
    cy.contains('Cardiologia').should('be.visible');
    cy.contains('UBS da Federação').should('be.visible');
  });

  it('Should display past patient consultations (if UI allows)', () => {
    // Com base no componente, há uma seção de "Consultas Realizadas"
    cy.contains('Consultas Realizadas').should('be.visible');
    cy.contains('Dra. Maria Oliveira').should('be.visible'); // Consulta realizada da Maria
    cy.contains('Ginecologia').should('be.visible');
  });

  it('Should allow scheduling a new consultation (example flow)', () => {
    // Este teste é mais complexo e depende da sua UI de agendamento.
    // Vou simular um fluxo genérico. Ajuste os seletores conforme sua UI.
    
    // Acessa o botão ou link para agendar nova consulta
    cy.get('button').contains('Agendar Nova Consulta').click();
    
    // Seleciona uma especialidade (ex: Pediatria)
    cy.get('select[name="specialty"]').select('Pediatria');
    
    // Seleciona uma unidade de saúde (ex: USF São Marcos)
    cy.get('select[name="unit"]').select('USF São Marcos');

    // Seleciona um profissional (ex: Dr. Carlos Souza)
    cy.get('select[name="professional"]').select('Dr. Carlos Souza');
    
    // Seleciona uma data e hora (o componente usa um input type="date")
    cy.get('input[type="date"]').type('2024-11-01'); // Exemplo de data futura
    cy.get('select[name="time"]').select('10:00'); // Exemplo de horário
    
    // Confirma o agendamento
    cy.get('button').contains('Confirmar Agendamento').click();
    
    // Verifica se a consulta foi agendada e aparece na lista
    cy.contains('Consulta agendada com sucesso!').should('be.visible');
    cy.contains('Dr. Carlos Souza').should('be.visible');
    cy.contains('01/11/2024').should('be.visible');
  });

  it('Should allow cancelling an upcoming consultation (example flow)', () => {
    // Encontra uma consulta agendada (ex: a primeira da lista)
    // Para este exemplo, vamos buscar a consulta de cardiologia agendada
    cy.contains('Dr. João Silva')
      .parent() // Pega o elemento pai que contém toda a informação da consulta
      .contains('Agendada')
      .parent()
      .find('button').contains('Cancelar').click(); // Encontra e clica no botão de cancelar

    // Confirma o cancelamento (se houver modal de confirmação)
    cy.contains('Confirmar Cancelamento').should('be.visible');
    cy.get('button').contains('Sim, Cancelar').click();

    // Verifica se a consulta agora está como "Cancelada" ou não aparece mais como agendada
    cy.contains('Dr. João Silva')
      .parent()
      .contains('Cancelada')
      .should('be.visible');
  });
});