const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initializeDatabase } = require('./config/database');
const profileRoutes = require('./routes/profileRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'GitHub Profile Analyzer API',
    version: '1.0.0',
    endpoints: {
      analyze: 'POST /api/profiles/analyze/:username',
      getAll: 'GET /api/profiles',
      getByUsername: 'GET /api/profiles/username/:username',
      getById: 'GET /api/profiles/:id',
      delete: 'DELETE /api/profiles/:username'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/profiles', profileRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API documentation: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
