const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/zcare';

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('�� Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

require('./models');

app.get('/', (req, res) => {
  res.send('Hello World ! 🚀');
});

app.listen(PORT, () => {
  console.log(`⚡️ Serveur démarré sur http://localhost:${PORT}`);
});