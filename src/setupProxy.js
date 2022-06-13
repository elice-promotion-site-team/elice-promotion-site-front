// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: `http://localhost:3001`, // PORT 수정 필요
      changeOrigin: true,
    }),
  );
};
