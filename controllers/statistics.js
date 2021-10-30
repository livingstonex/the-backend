const asyncHandler = require('../middleware/async');
const StatisticsService = require('../services/statistics.service');


/**
  @desc Get best institution to study a subject
  @route GET /api/v1/stats/institutions/:id/best
  @access PUBLIC
 */
  exports.getBestInstitutionForSubject = asyncHandler(async (req, res, next) => {
    const { subject } = req.body;

    if (!subject) {
      return res.badRequest({
        message: 'Please enter a valid subject.'
      })
    }

    const best = await StatisticsService.getBestInstitutionForSubject(subject);

    if (!best) {
      return res.notFound({
        message: 'No institution has this subject.'
      })
    }

    return res.ok({
      message: 'Successfully retrieved best institution.',
      data: best
    })
});