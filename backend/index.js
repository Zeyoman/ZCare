const express = require('express');

const router = express.Router();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World ! 🚀');
});

app.listen(PORT, () => {
  console.log(`⚡️ Serveur démarré sur http://localhost:${PORT}`);
});