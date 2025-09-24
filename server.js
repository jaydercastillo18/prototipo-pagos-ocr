const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// 👉 Servir archivos estáticos (index.html, css, js, etc.)
app.use(express.static(path.join(__dirname)));

// 👉 Cuando entren a "/" devolver index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 👉 Endpoint OCR
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await Tesseract.recognize(req.file.path, "spa");
    res.json({ text: result.data.text });
  } catch (err) {
    res.status(500).json({ error: "Error procesando la imagen" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
