// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable {
    loginAsAdmin(): Chainable<void>
    loginAsPatient(): Chainable<void>
    loginAsProfessional(): Chainable<void>
    logout(): Chainable<void>
  }
}