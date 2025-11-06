// Tipo: E2E - Agendamento

describe('Agendamento (E2E)', () => {
  it('Preenche formulário de agendamento e confirma', () => {
    cy.visit('/agendamentos')
    cy.get('form').first().within(() => {
      cy.get('select[name=ubs]').first().then($sel => { if($sel.length) cy.wrap($sel).select(0) })
      cy.get('input[type=date], input[name=data]').first().then($d => { if($d.length) cy.wrap($d).type('2025-11-10') })
      cy.get('button[type=submit], button').contains(/agendar|confirmar|marcar/i).click({ force: true })
    })
    cy.contains(/agendamento realizado|confirmado|sucesso/i)
  });

  it('Agendamentos', function() {});
})
