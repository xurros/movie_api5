const jwtSecret = "your_jwt_secret";

const jwt = require("jsonwebtoken"),
  passport = require("passport");

// your local passport file
require("./passport");

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256"
  });
}

// POST login

module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      console.log(error);
      if (error || !user) {
        return res.status(400).json({
          message: error || "Something is broken.",
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
