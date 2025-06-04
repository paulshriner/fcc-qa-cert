# freeCodeCamp Quality Assurance Certificate

These are the projects I did in the completion of this certificate.

[Here](https://www.freecodecamp.org/certification/fcc30aca8b2-d2c4-4009-a397-2e6d1ecbde3b/quality-assurance-v7) is my certificate on freeCodeCamp.

## Projects

### Metric-Imperial Converter

Allows converting between various units of measurement including gal, L, etc. I used Express to handle routes and the Chai library for unit and functional tests.

### Issue Tracker

Tracks issues for projects. An issue can be created with a title, description, and other information. This information can be updated and the issue itself can be deleted. I used a MongoDB database to store issues, Express to handle routes, and wrote functional tests using the Chai library.

### Personal Library

A library to hold information on books. Each book contains a title and comments. I used a MongoDB database to store books, Express to handle routes, and wrote functional tests using the Chai library.

### Sudoku Solver

A solver for sudoku puzzles. You can enter a puzzle string and it will solve the puzzle. In addition, there is a checking feature where you can check if a value would be valid for a coordinate based on row, column, and region. The solving algorithm uses constraint satisfaction to find possible values for each slot. If a slot is found with one possible value, that slot is filled then all slots are rechecked. If all open slots have multiple possible values, then backtracking is used to attempt each combination of values. Along with the solving algorithm, I wrote routes as well as unit and functional tests.

### American British Translator

Translates American English to British English and vice versa. The application will highlight what text was translated in the result. I wrote routes, translation logic, as well as unit and functional tests.

## Skills

- Node.js
- Express
- Chai
- MongoDB
- Mongoose

## Development Tools

- [VS Code](https://code.visualstudio.com/) - Development environment
- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
- [Git](https://git-scm.com/)/[GitHub](https://github.com/) - Version control
- [MongoDB Atlas](https://www.mongodb.com/) - Provides the database used

## Running the Projects
You will need node.js installed. To run a project, navigate to the project folder, open a terminal window, then type ```npm install```, then ```npm start```. This will start a local server that can be viewed in a web browser.

The Issue Tracker and Personal Library projects require a database on MongoDB Atlas. [Here](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/) is a guide to create an account and set up a database. Once you have your URI string, create a file called .env in the project folder, then assign the URI string to MONGO_URI.
