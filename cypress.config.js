const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // Populate the environment from process.env
      config.env.env = process.env.ENV || 'local';
      config.env.e2e = config.env.env !== 'local';

      // configure cypress-keycloak
      config.env.keycloak = {
        root: process.env.KEYCLOAK_URL,
        realm: 'lev_dev',
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
        // eslint-disable-next-line camelcase
        client_id: 'lev-web-ui',
        // eslint-disable-next-line camelcase
        redirect_uri: process.env.TEST_URL,
        path_prefix: ''
      };

      // configure cypress-axe
      on('task', {
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        }
      });

      return config;
    },
    testIsolation: false,
    baseUrl: 'http://localhost:8001',
  }
});
