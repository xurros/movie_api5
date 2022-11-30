## movie_api5

💁 Project Summary

In this project, we learn how to start working on our own API. How to conceptualize and design the architecture of our API (including requests and responses), as well as what kind of information (if any) we need to include in our request and response bodies. We then walked through an example API, exploring a few new Express features such as request parameters, the body-parser and uuid modules, and status codes, all before looking at how we can test our URL endpoints via API development tools like Postman.

![](header.png)

## Installation

OS X & Linux:

```sh
npm install movie_api5 --save
```


## Usage example

A few motivating and useful examples of how your product can be used. Spice this up with code blocks and potentially more screenshots.

_For more examples and usage, please refer to the [Wiki][wiki]._

## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
make install
npm test
```

## Release History

* 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1
    * Work in progress

## Meta

Your Name – [@YourTwitter](https://twitter.com/dbader_org) – YourEmail@example.com

Distributed under the XYZ license. See ``LICENSE`` for more information.

[https://github.com/yourname/github-link](https://github.com/dbader/)

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki





[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%23D546AB&lines=hello!;thank+you+for+visiting;movie_api5+app+repo)](https://git.io/typing-svg)

movie_api5 is api movie database to be used in conjunction with the 
https://main--honeypotflixplay.netlify.app/. <img src="https://github.com/xurros/assets/blob/main/netlify1.png" width="45" />

## 🛠️ Tools/Frameworks used

Node.js
JavaScript
Express.js
MongoDB
Mongoose

### 👓 Description


As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.

As a user, I want to be able to create a profile so I can save data about my favorite movies

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







