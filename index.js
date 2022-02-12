// platforms needed =====
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const morgan = require("morgan");

const app = express();
//  process data sent through an HTTP request body  - using bodyParser=====
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// use middleware to log HTTP requests and errors =====
app.use(morgan("common"));
app.use(express.json());

//integrating mongoose with REST API
const cors = require("cors");
const { check, validationResult } = require("express-validator");

//CORS all domain access
// app.use(cors());
// If you want to give some domains to access the server : 

let allowedOrigins = ["http://localhost:3000", "http://localhost:8000", "http://localhost:1234", "https://honeypotflix.herokuapp.com"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      //If a specific origin isn't found on the list of allowed origins
      let message = `The CORS policy for this application doesn't allow access from origin ${origin}`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

const mongoose = require("mongoose");
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
// require('dotenv').config();


// Schema file
const Models = require("./models.js");
// Schemas
const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;


//Connect to the server you created
const mongouri = process.env.MONGODB_URI;

// mongoose.connect(process.env.CONNECTION_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connect('mongodb://localhost:27017/mymovieDB', { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect("mongodb+srv://foundry123:foundry123@mymovieDB.5wgon.mongodb.net/mymovieDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, useUnifiedTopology: true
  });

// mongoose.connect("mongodb://localhost:27017/mymovieDB",
// {
//   useNewUrlParser: true, useUnifiedTopology: true
// });

// mongoose.connect('process.env.CONNECTION_URI',
//   { useNewUrlParser: true, useUnifiedTopology: true });

// to fetch static files =====
// app.use("/documentation", express.static("public"));





// Authentication process 2.9
let auth = require("./auth")(app);
const passport = require('passport');
require('./passport');
app.use(passport.initialize());

//GET requests
app.use("/", express.static("public"));


//  GET/READ REQUEST LIST======
//  to get a welcome page====
app.get("/", (req, res) => {
  res.send("<h3> Welcome to honeypotflix</h3>");
});

//  #1. to get the data on ALL movies ====
app.get("/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// #2. to get data on a certain movie by title
app.get(
  "/movies/:Title", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// 3.Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get(
  "/movies/genre/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.title })
      .then((movie) => {
        res.json(movie.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);
// #4. to get data on a certain movie by genre
app.get(
  "/movies/genre/:Genre", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log('GENRE: ', req.params.Genre)
    Movies.find({ Genre: req.params.Genre })
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// #5A.Return data about a director (bio, birth year, death year) by name
app.get(
  "/movies/director/:Name", (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.name })
      .then((movie) => {
        res.json(movie.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
// #5b. to get data on a certain director
app.get("/directors/:Name", (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//#6. to get the data on ALL users =========
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


// #7.to get users by Name
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

//  =======END OF GET/READ REQUEST =========

//  UPDATE LISTS ====
// #8. to update user info by username
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],

  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set:
        {
          Username: req.body.Username,
          Email: req.body.Email,
          Password: req.body.Password,
          Birthday: req.body.Birthday
        }
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      });
  });

//  CREATE LISTS =======
// #9. allow users to register/add new user  =========
app.post("/users", [
  check("Username", "Username is required").isLength({ min: 6 }),
  check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
  check("Password", "Password is required").not().isEmpty(),
  check("Email", "Email does not appear to be valid.").isEmail()
],
  (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashPassword = Users.hashPassword(req.body.Password);

    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + " " + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
            FavoriteMovies: req.body.Title
          })
            .then((user) => {
              res.status(201).json(user)
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  });

// #10. to add a movie to users favorite list =====
app.post(
  "/users/:Username/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteMovies: req.params.Title } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      });
  });

// ERASE LISTS ========
// #11. to Delete a movie from the favorite list by title =====
app.delete(
  "/users/:Username/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.Title } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      });
  });

// #12. to delete a user by username =====
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found.");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// #13. Allow existing users to deregister - showing text that the email has been removed
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Your email has been removed. Please register as a new user");
  }
);

// ERROR HANDLING =======
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Whoops! Please try again");
});

//  LISTEN REQUEST ========
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("MymovieDB is on Port " + port)
});

 // mongoexport --uri http://mymovieDB:foundry123@localhost:27017/mymovieDB --collection movies --type json --out movies.json

 // mongoimport --collection=movies --db=mymovieDB --out=movies.json