# Cypress — UBS (Testes Automatizados)

Guia rápido para executar, entender e manter os testes E2E do sistema UBS.

## Estrutura de Pastas
- `cypress/e2e/api/` — testes de API
- `cypress/e2e/ui/` — testes de interface (login, agendamento, relatórios, etc.)
- `cypress/support/` — comandos customizados e configuração global
- `cypress.config.ts` — configuração principal

## Executando os testes
```bash
npm install
npx cypress open
```
ou, modo headless:
```bash
npx cypress run
```

## Convenções
- Utilize `data-cy` como seletor em elementos HTML.
- Use `cy.intercept()` para controlar chamadas HTTP.
- Evite `cy.wait()` fixo — prefira esperar requisições nomeadas (`cy.wait('@alias')`).

## Novos testes adicionados
- `register.cy.ts` — cadastro de paciente.
- `schedule.cy.ts` — agendamento completo.
- `cancel.cy.ts` — cancelamento de consulta.
- `reports.cy.ts` — geração de relatórios.
- `availability.cy.ts` — verificação de horários de profissional.

---
> Mantido por equipe de QA — UBS Digital
