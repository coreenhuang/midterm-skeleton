// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const db = require('./db/connection');





const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieParser());


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const homepageRoutes = require('./routes/homepage');
const quizzesRoutes = require('./routes/quizzes');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/', homepageRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
// Note: mount other resources here, using the same pattern above



// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  db.query("select * from quizzes where public = 'on' order by id;")
    .then((response) => {
      const publicQuizzes = response.rows;
      console.log("publicQuizzes:", publicQuizzes);
      res.render('index', { publicQuizzes });
    })
});



// Logout Route
app.get("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
