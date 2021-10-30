
/**
 * @desc Async Handler for our controllers [ - Implements DRY principle - ]
 */
 const asyncHandler = fn => (req, res, next) => 
 Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler; 