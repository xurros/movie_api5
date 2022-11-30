
<div align="center">

  <img src="assets/logo.png" alt="logo" width="200" height="auto" />
  <h1>movie_api5</h1>
 
   </div>
  <br /> <br />
  <br />

 
💁 Project Summary

In this project, we learn how to start working on our own API. How to conceptualize and design the architecture of our API (including requests and responses), as well as what kind of information (if any) we need to include in our request and response bodies. We then walked through an example API, exploring a few new Express features such as request parameters, the body-parser and uuid modules, and status codes, all before looking at how we can test our URL endpoints via API development tools like Postman.

![](header.png)

## Installation

OS X & Linux:

```sh
npm install movie_api5 --save
```


## Scenario

As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.

As a user, I want to be able to create a profile so I can save data about my favorite movies.


## Progress History

* movie_api
    * assigning express in index.js file
    * Tested my project from the terminal and navigating to your URL endpoints in a browser (in this stage the documentation.html page was created)
    * using morgan middleware to log the request (in the terminal)
    * creating an error handling function (bodyParser was not installed)
    
* movie_api2
    * no change
    
* movie_api3
    * assigning express in index.js file
    * Tested the project from the terminal and navigating to my URL endpoints in a browser (via Postman)

* movie_api4
    * using react 
    * implementing Authorization and Authentication
    
* movie_api5

    * Work in progress

## Meta

movie_api5 is an api movie database to be used in conjunction with the 
https://main--honeypotflixplay.netlify.app/.
<img src="https://github.com/xurros/assets/blob/main/netlify1.png" width="45" />

* Raw Documentation: 
https://github.com/xurros/movie_api5/blob/main/public/documentation.html 

* or 
(https://xurros.github.io/movie_api5/public/documentation.html)


<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki







## 🛠️ Tools/Frameworks used

Node.js
JavaScript
Express.js
MongoDB
Mongoose

### 👓 Description




### 👓 Features:

Returns a list of ALL movies to the user
Returns data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
Returns data about a genre (description) by name/title (e.g., “Thriller”)
Returns data about a director (bio, birth year, death year) by name
Allows new users to register
Allows users to update their user info (username, password, email, date of birth)
Allows users to add a movie to their list of favorites
Allows users to remove a movie from their list of favorites
Allows existing users to deregister







