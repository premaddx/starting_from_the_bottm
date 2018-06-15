/**
 * Example handler
 * Basic structure / pattern for any handler (this must be followed for code uniformity)
 */

async function logic() {
  // return the data after implementation
  return { message: 'Backend Working' };
}

function handler(req, res, next) {
  // pass req object for implementing business logic
  logic().then((data) => {
    res.json({
      success: true,
      data,
    });
  }).catch(err => next(err));
}

module.exports = handler;