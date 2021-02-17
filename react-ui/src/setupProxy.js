const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      headers: {
        accept: "application/json",
        methods: "GET"
      },
      changeOrigin: true,
    })
  );
  app.use(
    "/auth/login",
    createProxyMiddleware({
      target: "5000",
      headers: {
        accept: "application/json",
        methods: "POST"
      },
      changeOrigin: true,
    })
  );
};
