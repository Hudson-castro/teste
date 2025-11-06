// Tipo: E2E - Navegação

describe('Navegação principal (E2E)', () => {
  it('Navega pelos links do menu e valida rotas', () => {
    cy.visit('/')
    cy.get('nav a, header a').each(($a) => {
      const href = $a.attr('href')
      if (href && href.startsWith('/')) {
        cy.wrap($a).click({ force: true })
        cy.location('pathname').should('eq', href)
        cy.go('back')
      }
    })
  })
})
