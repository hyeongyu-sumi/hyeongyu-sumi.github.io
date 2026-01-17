module.exports = {
  testDir: './',
  testMatch: '**/*.spec.js',
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:9998',
    screenshot: 'only-on-failure',
  },
};
