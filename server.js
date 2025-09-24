const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// 👉 servir archivos estáticos (css, js, imágenes, etc.)
app.use(express.static(path.join(__dirname)));

// 👉 ruta principal devuelve el index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor OCR funcionando 🚀 en puerto ${PORT}`);
});
