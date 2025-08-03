const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173/',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use('/', authRoutes);

module.exports = app;
