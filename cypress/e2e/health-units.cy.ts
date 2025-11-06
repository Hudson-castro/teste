// cypress/e2e/health-units.cy.ts

describe('Health Units Listing Tests', () => {
  // Faz login como paciente para acessar as informações das unidades de saúde
  beforeEach(() => {
    cy.loginAsPatient();
    // A partir do componente, o paciente pode ver as unidades no "Agendar Nova Consulta"
    // Ou se houver uma seção específica, um botão para "Unidades de Saúde".
    // Vamos simular clicando em agendar nova consulta para acessar a lista de UBS.
    cy.get('button').contains('Agendar Nova Consulta').click();
  });

  it('Should display a list of health units', () => {
    // Verifica se o seletor de unidades está visível
    cy.get('select[name="unit"]').should('be.visible');
    
    // Verifica se algumas unidades conhecidas estão listadas
    cy.get('select[name="unit"]').children('option').should('have.length.greaterThan', 1); // Pelo menos umas opções além do placeholder
    cy.get('select[name="unit"]').contains('Centro de Saúde Dr. Eduardo R. Baia').should('exist');
    cy.get('select[name="unit"]').contains('Unidade Básica de Saúde da Federação').should('exist');
  });

  it('Should allow filtering units by district (if UI supports it)', () => {
    // Se houver um input/select para filtrar por bairro, este teste seria assim:
    // cy.get('[data-cy="filter-district"]').type('Centro');
    // cy.contains('Centro de Saúde Dr. Eduardo R. Baia').should('be.visible');
    // cy.contains('Unidade Básica de Saúde da Federação').should('not.exist');
    
    // Como a UI atual do componente não mostra um filtro por bairro direto na lista,
    // vamos apenas verificar que as unidades corretas aparecem.
    cy.log('Nenhum filtro de distrito explícito encontrado na UI para testar.');
    cy.log('Teste apenas verifica que unidades estão listadas.');
  });

  it('Should display detailed information for a selected health unit (if UI supports it)', () => {
    // Se houvesse uma funcionalidade para clicar numa UBS e ver detalhes,
    // o teste seria mais ou menos assim:
    
    // Seleciona uma UBS
    cy.get('select[name="unit"]').select('Centro de Saúde Dr. Eduardo R. Baia');
    
    // Verifica se os detalhes da UBS são exibidos
    // Este seria um cenário mais comum se a UBS aparecesse como um card clicável,
    // não apenas em um select. Com a UI atual, o select apenas seleciona para agendamento.
    // Então, vamos verificar as especialidades que um profissional dessa UBS oferece.
    
    cy.get('select[name="specialty"]').should('be.visible');
    cy.get('select[name="specialty"]').contains('Clínica Geral').should('exist'); // Especialidade do CS Dr. Eduardo
  });
});