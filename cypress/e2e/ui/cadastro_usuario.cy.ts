// Tipo: E2E - Cadastro de Usuário

describe('Cadastro de Usuário (E2E)', () => {
  it('Preenche formulário de cadastro e valida mensagem de sucesso', () => {
    cy.visit('/cadastro')
    cy.get('form').first().within(() => {
      cy.get('input[name=nome]').first().type('Hudson Teste')
      cy.get('input[name=email]').first().type('hudson+teste@example.com')
      cy.get('input[name=senha], input[type=password]').first().type('Senha123!')
      cy.get('button[type=submit], button').contains(/cadastrar|registrar|enviar/i).click({ force: true })
    })
    cy.contains(/sucesso|cadastrado|registrad/i)
  })
})
