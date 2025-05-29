
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let logs = []; // Aquí se almacenan los registros

// POST /api/flecha → Guarda flecha y hora
app.post('/api/flecha', (req, res) => {
  const { button } = req.body;

  if (!button) {
    return res.status(400).json({ error: 'El campo "button" es obligatorio' });
  }

  const log = {
    button,
    timestamp: new Date().toISOString(),
  };

  logs.unshift(log); // Lo añade al inicio
  res.status(201).json({ message: 'Flecha registrada', log });
});

// GET /api/logs → Devuelve el historial
app.get('/api/logs', (req, res) => {
  res.json(logs);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
