/** @format */

const corsProxy = require("cors-anywhere");

const PORT = 8080;

corsProxy
  .createServer({
    originWhitelist: [],
  })
  .listen(PORT, () => {
    console.log(`Servidor proxy CORS en ejecución en http://localhost:${PORT}`);
  });
