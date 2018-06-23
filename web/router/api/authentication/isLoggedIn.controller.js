function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.json({
      success: true,
      data: req.user.user,
    });
  }
  next();
}

module.exports = isLoggedIn;