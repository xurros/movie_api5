// platforms needed =====
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const morgan = require("morgan");
const app = express(); //instantiate app

const mongoose = require("mongoose");
// Schema file
const Models = require("./models.js");
const { check, validationResult } = require("express-validator");

// Schemas
const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(process.env.MONGODB_URI);

app.use(bodyParser.json()); // use body-parser - //  process data sent through an HTTP request body  - using bodyParser=====
app.use(bodyParser.urlencoded({ extended: true })); // use body-parser encoded

let allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:1234",
  "http://localhost:4200",
  "https://honeypotflix.herokuapp.com",
  "https://main--honeypotflixplay.netlify.app",
  "https://honeypotflixplay.netlify.app"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      //If a specific origin isn't found on the list of allowed origins
      let message = "The CORS policy for this application doesn't allow access from origin" + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

// Authentication process 2.9
let auth = require("./auth")(app);
// Require passport after auth
const passport = require('passport');
require('./passport');
const { param } = require("express-validator/src/middlewares/validation-chain-builders");

app.use(morgan('common')); // log requests to terminal

//  to get a welcome page====
app.get("/",
  (req, res) => {
    res.send("Welcome to honeypotflix! This is the project creating a React app linked to its backend using REST API and MongoDB for its database");
  });

//  #1. to get the data on ALL movies ====
app.get("/movies",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(200).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// #2. to get data on a certain movie by title
app.get("/movies/:Title",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        if (movie === null) {
          res.status(404).send("No movie/s found")
        } else {
          res.status(201).json(movie);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);



//  PROBLEMS!!!

// * api call to return data about a single genre by name (i.e. Drama)
app.get("/genres/:Genre",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Genres.findOne({ Name: req.params.Name })
      .then((genres) => {
        res.status(201).json(genres);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// to get data on a genre by Title of the movie  
app.get('/movies/genres/:Title',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Find a matching genre based on the genre name passed in the URL, then send the genre details in json format to the client
    // This will be found from the db.movies collection, but we will obtain all information about a genre we need from a single entry
    Movies.findOne({ Title: req.params.Title })
      .then((movies) => {
        res.json(movies.Genre);
        // If errors are found run the error catching function
      }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


app.get('/movies/genres/:Name',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Find a matching genre based on the genre name passed in the URL, then send the genre details in json format to the client
    // This will be found from the db.movies collection, but we will obtain all information about a genre we need from a single entry
    Movies.findOne({ Genre: req.params.Name })
      .then((movies) => {
        res.json(movies.Title);
        // If errors are found run the error catching function
      }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });



// Get  directors
// to get the data on ALL directors =========
app.get("/directors",
  (req, res) => {
    Directors.find()
      .then((directors) => {
        res.status(201).json(directors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// Call one particular director and the bio
app.get("/directors/:Name",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Directors.findOne({ Name: req.params.Name })
      .then((director) => {
        res.status(201).json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);


//Call liss of the movies from one particular director

// app.get("/movies/directors/:Name",
//   (req, res) => {
//     Directors.findOne({ "Director.Name": req.params.Name })
//       .then((movies) => {
//         res.status(201).json(movies);
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//       });
//   }
// );

//  ####################################




//#6. to get the data on ALL users =========
app.get("/users",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
app.get("/users/:Username",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

// #8. to update user info by username
app.put("/users/:Username",
  // passport.authenticate("jwt", { session: false }),
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
app.post("/users",
  [
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
app.post("/users/:Username/movies/:Title",
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
app.delete("/users/:Username/movies/:Title",
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
app.delete("/users/:Username",
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
app.delete("/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);

      });
    alert("Your email has been removed. Please register as a new user");

  });

app.use(express.static("public", {
  extensions: ["html"],
}));



//  GET/READ REQUEST LIST======


// Get documentation page
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {
    root: __dirname,
  });
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
