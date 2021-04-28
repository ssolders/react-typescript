const createProxyMiddleware = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/**',
//     createProxyMiddleware({
//       target: 'https://test-dev.paymentiq.io:443',
//       secure: false,
//       changeOrigin: true,
//       open: true,
//       headers: {
//         Connection: 'keep-alive',
//         Host: 'test-dev.paymentiq.io'
//       }
//     })
//   );
// };

module.exports = function(app) {
  app.use(
    '/paymentiq',
    createProxyMiddleware({
      target: 'https://test-dev.paymentiq.io:443',
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive',
        Host: 'test-dev.paymentiq.io'
      }
    })
  );
};