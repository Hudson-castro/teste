import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // URL base da sua aplicação
    baseUrl: 'http://localhost:5173', 
    // Padrão para encontrar os arquivos de teste
    specPattern: 'cypress/e2e/**/*.cy.ts', 
    // Arquivo de suporte para configurações globais e imports de comandos
    supportFile: 'cypress/support/e2e.ts', 
    // Aumenta o tempo limite padrão para comandos do Cypress
    defaultCommandTimeout: 10000, 
    setupNodeEvents(on, config) {
      // Implemente aqui os listeners de eventos do Node, se necessário
      // por exemplo: para tarefas de banco de dados, reportes, etc.
      return config
    },
  },
})