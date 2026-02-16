const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://hiv-dashboard-env.eba-yewzkg2q.us-west-2.elasticbeanstalk.com'
  }
});
