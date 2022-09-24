// Dependencies
const jwt = require("jsonwebtoken");

// do login
const doLogin = async (req, res) => {
  // generate a jwt token
  const token = jwt.sign(res.locals.user, process.env.JWT_SECRET_KEY, {
    expiresIn: parseInt(process.env.JWT_EXPIRY_TIME, 10),
  });

  // set the cookie
  res.cookie(process.env.APP_NAME, token, {
    maxAge: process.env.JWT_EXPIRY_TIME,
    httpOnly: true,
    signed: true,
  });

  res.status(200).json({
    message: "Login successful",
  });
};

// logout
const doLogout = async (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
  } else {
    res.clearCookie(process.env.APP_NAME);
  }

  if (res.locals.HTML) {
    res.redirect("/login");
  } else {
    res.status(200).json({
      message: "Logged out successfully!",
    });
  }
};

module.exports = {
  doLogin,
  doLogout,
};
