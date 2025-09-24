// server.js
// ===============================
// Backend con Express + Tesseract OCR
// ===============================

// 1. Importamos dependencias
const express = require("express");
const multer = require("multer");       // Para recibir imágenes
const cors = require("cors");           // Para permitir conexión desde tu frontend
const Tesseract = require("tesseract.js"); // OCR

// 2. Inicializamos servidor
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middleware
app.use(cors()); // permite que tu index.html en otro dominio se conecte
app.use(express.json());

// 4. Configuración de multer para subir imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 5. Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Servidor OCR funcionando 🚀");
});

// 6. Endpoint para subir imágenes y aplicar OCR
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se envió ninguna imagen" });
    }

    // Ejecutamos OCR con tesseract.js
    const result = await Tesseract.recognize(req.file.buffer, "spa+eng", {
      logger: (m) => console.log(m), // log de progreso
    });

    res.json({
      text: result.data.text, // texto detectado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la imagen" });
  }
});

// 7. Arrancar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
