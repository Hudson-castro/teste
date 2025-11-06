// Tipo: API - POST

describe('API - POST /api/ubs', () => {
  it('Cria recurso via API e valida resposta', () => {
    const payload = { nome: 'cypress-ubs-11', descricao: 'Teste automatizado' }
    cy.request({ method: 'POST', url: '/api/ubs', body: payload, failOnStatusCode: false }).then((resp) => {
      expect(resp.status).to.be.oneOf([200,201,204])
      if (resp.status === 200 || resp.status === 201) expect(resp.body).to.not.be.undefined
    })
  })
})
