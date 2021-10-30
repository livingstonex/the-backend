const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const InstitutionService = require('../services/institution.service');
// const SubmissionService = require('../services/submission.service');
const IdUtils = require('../utils/id.utils');


/**
  @desc Get all Institutions
  @route GET /api/v1/institutions
  @access PUBLIC
 */
exports.getInstitutions = asyncHandler(async (req, res, next) => {
    const institutions = await InstitutionService.getAllInstitutions();

    return res.ok({
      data: institutions,
    });
});

/**
  @desc Get single institution 
  @route GET /api/v1/institution/:id
  @access PUBLIC
 */
exports.getInstitution = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const institution = await InstitutionService.getInstitution(id);

    if (!institution) {
      return res.notFound({ message: `Institution not found with id of ${id}` })
      // return next(
      //   new ErrorResponse(`Institution not found with id of ${id}`, 404)
      // );
    }

    return res.ok({ data: institution });
});

/**
  @desc Create new institution
  @route POST /api/v1/institutions
  @access PRIVATE
 */
exports.createInstitution = asyncHandler(async (req, res, next) => {
    const { name, address, country, region } = req.body;

    if (!name || !address || !country || !region) {
      return res.badRequest({
        message: 'Please enter all fields!.'
      })
    }

    const id = await IdUtils.generateUniqueId();

    const payload = {
      name,
      address,
      country,
      region,
      id,
    }

    const institution = await InstitutionService.createInstitution(payload);

    if (!institution) {
      return res.unprocessable({
        message: 'Request could not be processed at this time. Please again shortly.'
      })
    }

    return res.created({
      message: 'Institution created successfully.',
      data: institution
    });
})

/**
  @desc Update an institution
  @route PUT /api/v1/institutions/:id
  @access PRIVATE
 */
exports.updateInstitution = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, address, country, region, } = req.body;

  if (!name || !address || !country || !region) {
    return res.badRequest({
      message: 'Please enter all fields!.'
    })
  }

  // Remember to run validation
  const payload = {
    name,
    address,
    country,
    region,
    id,
  }

  const institution = await InstitutionService.updateInstitution(payload);

  if (!institution) {
    return res.notModified({
      message: 'Request not successful. Please check that the correct id is passed and try again.'
    })
  }

  return res.ok({
    message: 'Institution successfully modified.',
    data: institution
  });
});


/**
  @desc Chech=k if an institution has a subject 
  @route GET /api/v1/institution/:id/subject
  @access PUBLIC
 */
  exports.checkInstitutionForSubject = asyncHandler(async (req, res, next) => {
    const { id: institution_id } = req.params;
    const { subject } = req.body;

    if (!subject) {
      return res.badRequest({
        message: 'Please enter all fields.'
      });
    }
    
    const response = await InstitutionService.checkInstitutionForSubject(institution_id, subject)

    if (!response) {
      return res.notFound({ message: `Institution not found with id of ${institution_id}` });
    }

    return res.ok({
      message: `Successful. This institution has the subject: ${response}`,
      data: response
    });
});