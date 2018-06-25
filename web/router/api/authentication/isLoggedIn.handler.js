function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.json({
      success: true,
      data: req.user.email,
      message: 'You are already logged in',
    });
  }
  next();
}

module.exports = isLoggedIn;