// Tipo: API - GET

describe('API - GET /api/ubs', () => {
  it('Retorna 200/204 e corpo válido', () => {
    cy.request({ method: 'GET', url: '/api/ubs', failOnStatusCode: false }).then((resp) => {
      expect(resp.status).to.be.oneOf([200,204])
      if (resp.status === 200) expect(resp.body).to.not.be.undefined
    })
  })
})
