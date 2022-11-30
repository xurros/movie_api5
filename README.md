## 🎥 movie_api5


[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%23D546AB&lines=hello!;thank+you+for+visiting;honeypotflixplay+app+repo)](https://git.io/typing-svg)

honeypotflixplay is the client-side app to be used in conjunction with the [movie_api5](https://xurros.github.io/movie_api5/) and it's also a replacement of myFlix-client.

## 🛠️ Build Tools
honeypotflixplay uses [Parcel](https://parceljs.org/docs/) to transpile JSX into JavaScript and SCSS into CSS, and bundle the project into as few files as possible to serve to the client. Parcel is currently set up in development mode. As such, the code is not minified.  
To start the build tools, run the command `parcel src/index.html` in the powershell terminal. The project will be hosted at localhost:1234 and will have live-reload enabled.

## 🧩 Framework
Node.js
JavaScript
Express.js
MongoDB
Mongoose
### 👓 Views

| View | Description |
| --- | --- |
| `<MainView>` | This is the main view that contains each other element. The main view displays a list of `<MovieCard>` elements when no movie is selected. Clicking on a movie title will update MainView.state.selectedMovie with the selected movie. This triggers the rendering of the appropriate `<MovieView>` in place of the list of list of `<MovieCard>`s. |
| `<MovieCard>` | This is a simple element displaying the title of a movie. It is passed the `onMovieClick` function from the `<MainView>` as a parameter. The `onclick` function for the rendered `<MovieCard>` updates the `MainView.state.selectedMovie` with the clicked element's movie. |
| `<MovieView>` | This element displays details for the movie passed into the `movie` parameter. The element has a back button, which when clicked, updated the `MainView.state.selectedMovie` to `null`, triggering the rendering of the list of `<MovieCard>` elements. |



<img src="https://github.com/xurros/assets/blob/main/netlify1.png" width="45" />
 demo: https://main--honeypotflixplay.netlify.app/



Api for movie database, created to be used with the honeypotflix app

User Stories
