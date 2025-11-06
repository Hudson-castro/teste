/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Cadastro de Paciente — Tela de Registro', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('exibe validações obrigatórias quando campos vazios', () => {
    cy.get('[data-cy=register-submit]').click();
    cy.get('[data-cy=error-email]').should('contain', 'obrigatório');
    cy.get('[data-cy=error-cpf]').should('contain', 'obrigatório');
    cy.get('[data-cy=error-name]').should('contain', 'obrigatório');
  });

  it('valida formato de CPF e email', () => {
    cy.get('[data-cy=register-email]').type('invalido');
    cy.get('[data-cy=register-cpf]').type('123');
    cy.get('[data-cy=register-submit]').click();
    cy.get('[data-cy=error-email]').should('contain', 'inválido');
    cy.get('[data-cy=error-cpf]').should('contain', 'inválido');
  });

  it('cadastra paciente com sucesso (fluxo happy path)', () => {
    const payload = {
      name: faker.person.fullName(),
      cpf: '11122233396',
      email: faker.internet.email(),
      phone: '71999999999',
      birthdate: '1990-01-01'
    };

    cy.intercept('POST', '/api/patients', { statusCode: 201, body: { id: 'p-1', ...payload } }).as('createPatient');

    cy.get('[data-cy=register-name]').type(payload.name);
    cy.get('[data-cy=register-cpf]').type(payload.cpf);
    cy.get('[data-cy=register-email]').type(payload.email);
    cy.get('[data-cy=register-phone]').type(payload.phone);
    cy.get('[data-cy=register-birthdate]').type(payload.birthdate);
    cy.get('[data-cy=register-submit]').click();

    cy.wait('@createPatient');
    cy.get('[data-cy=toast]').should('contain', 'cadastro realizado');
    cy.url().should('include', '/login');
  });
});
