const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/paymentiq',
    createProxyMiddleware({
      target: 'http://0.0.0.0:8080',
      changeOrigin: true,
    })
  );
};