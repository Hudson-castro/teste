const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // ajuste a porta se for diferente
    setupNodeEvents(on, config) {
      // Você pode adicionar eventos Node personalizados aqui se precisar
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    video: false, // opcional: evita gravação de vídeo
  },
});
