const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const responses = require('./middleware/response'); 

// Load env files
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();

// Route files
const institution = require('./routes/institution');
const statistics = require('./routes/statistics');

const app = express();

// Body Parser
app.use(express.json());


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/healthcheck', (req, res) => {
  res.send('THE backend is online.')
});

// Response Middleware
app.use(responses);

// Mount routers
app.use('/api/v1/institutions', institution);
app.use('/api/v1/stats', statistics);
// app.use('/api/v1/submissions', submission);

// Error handler middleware
app.use(errorHandler);



const PORT = 9000; // process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server and exit process
  server.close(() => process.exit(1));
});

module.exports = server;