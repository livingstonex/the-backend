const express = require('express');
const {
  getInstitutions,
  getInstitution,
  createInstitution,
  updateInstitution,
  checkInstitutionForSubject,
} = require('../controllers/institutions');

const {
  getInstitutionSubmissions,
} = require('../controllers/submissions');

// Mounting the router
const router = express.Router();

// Routes
router
  .route('/')
  .get(getInstitutions)
  .post(createInstitution);

router
  .route('/:id')
  .get(getInstitution)
  .put(updateInstitution);

router
  .route('/:id/submissions')
  .get(getInstitutionSubmissions);

router
  .route('/:id/subject')
  .get(checkInstitutionForSubject)


module.exports = router;