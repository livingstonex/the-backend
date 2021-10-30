const express = require('express');

const {
   getBestInstitutionForSubject,
} = require('../controllers/statistics');

// Mounting the router
const router = express.Router();

// Routes
router
  .route('/institutions/best')
  .get(getBestInstitutionForSubject);

  module.exports = router;