var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test_db', 'root', 'root', {
  host: 'mysql-service',
  dialect: 'mysql',
});

// const mysql = require('mysql2');
// const con = mysql.createConnection({
//   host: "mysql-service", // docker-composeで記述したmysqlのサービス名
//   user: "root",
//   password: "root",
//   database: "test_db"
// });

// con.connect(err => {
//   if (err) throw err
//   console.log("Connection with MySQL has been extablished.");
// })

// const initSQLPath = path.join(__dirname, 'init.sql');
// const initSQL = fs.readFileSync(initSQLPath, 'utf8');
// con.query(initSQL, (error, result, fields) => {
//   if (error) throw error;
//   console.log("initialize MySQL data");
// })

var app = express();

try {
  sequelize.authenticate();
  console.log("Connection with MySQL has been extablished.");
} catch (error) {
  console.error("Cannot connect with MySQL");
  console.error(error);
}

app.use((req, res, next) => {
  req.mysql = sequelize;
});

// app.use((req, res, next) => {
//   req.mysql = con;
//   next();
// })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
