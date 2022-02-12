const jwtSecret = "your_jwt_secret";

const jwt = require("jsonwebtoken"),
  passport = require("passport");

// your local passport file
require("./passport");

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    // this is the username that is encoded in the JWT
    subject: user.Username,
    // this specifies that the token will expire in 7 days
    expiresIn: "7d",
    // this is the algorithm used to sign oder encode the values of the JWT
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

