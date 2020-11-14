const proxy = require("http-proxy-middleware");

console.log(process.env.REACT_APP_API_URL)
module.exports = app =>
  app.use(
    "/api",
    proxy({
      target: process.env.REACT_APP_API_URL,
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
    })
  );