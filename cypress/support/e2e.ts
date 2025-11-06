// cypress/support/e2e.ts

// Importa os comandos customizados
import './commands';

// Limpa o localStorage e sessionStorage antes de cada teste
// Isso ajuda a garantir um estado limpo para cada execução
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});