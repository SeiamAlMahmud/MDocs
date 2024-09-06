const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const uploadRouter = require("./routes/uploadRouter")
const docRouter = require("./routes/DocRouter")


const cors = require('cors');



const app = express();
// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://mdoc.almahmud.top'],  // Add your frontend URLs
  methods: ['GET', 'POST'],  // Specify allowed HTTP methods
  allowedHeaders: ['Authorization', 'Content-Type'],  // Allow the Authorization header for Bearer token
};

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://yourfrontenddomain.com'); // Frontend domain
//   res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/uploads', uploadRouter);
app.use('/docbox', docRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
