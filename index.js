// src/index.js
const express = require('express');
const uploadRoutes = require('./src/upload'); // Adjusted path if needed
const analysisRoutes = require('./src/analysis'); // Import the analysis routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Use the upload and analysis routes
app.use('/upload', uploadRoutes);
app.use('/analyze', analysisRoutes); // Set up analysis route

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
