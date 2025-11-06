// Tipo: E2E - Validação de Campos Obrigatórios

describe('Validação de Campos (E2E)', () => {
  it('Exibe erro ao deixar campos obrigatórios vazios', () => {
    cy.visit('/cadastro')
    cy.get('form').first().within(() => {
      cy.get('input[required]').each(($el) => cy.wrap($el).clear())
      cy.get('button[type=submit], button').contains(/cadastrar|enviar|salvar/i).click({ force: true })
    })
    cy.contains(/obrigatório|required|preencha/i)
  })
})
