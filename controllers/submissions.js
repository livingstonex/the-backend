const asyncHandler = require('../middleware/async');
const SubmissionService = require('../services/submission.service');


/**
  @desc Get all submissions for an Institution
  @route GET /api/v1/institutions/:id/submissions
  @access PUBLIC
 */
exports.getInstitutionSubmissions = asyncHandler(async (req, res, next) => {
    const { id: institution_id } = req.params;

    const submissions = await SubmissionService.getSubmissionsByInstitution(institution_id);

    if (submissions.length === 0) {
      return res.notFound({
        message: "No submissions found for this institution."
      })
    }

    return res.ok({
      data: submissions,
    });
  });
