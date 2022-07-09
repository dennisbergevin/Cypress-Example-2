const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  videoUploadOnPasses: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  defaultCommandTimeout: 20000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://qa-practical.qa.swimlane.io',
  },
})
