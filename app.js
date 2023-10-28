var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mysql = require('mysql2');
var mysql2 = require('mysql2/promise');
var secretConfig = require('./secret-config.json')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

var con;
var con2;
if (secretConfig.ENVIRONMENT == "WINDOWS" || secretConfig.ENVIRONMENT == "MACOS") {
  con = mysql.createPool({
    connectionLimit : 90,
    connectTimeout: 1000000,
    host: secretConfig.DB_HOST,
    user: secretConfig.DB_USER,
    password: secretConfig.DB_PASSWORD,
    database: secretConfig.DB_NAME,
    timezone: '+01:00',
    port: 3306,
    dateStrings: true
  });

  con2 = mysql2.createPool({
    connectionLimit : 90,
    connectTimeout: 1000000,
    host: secretConfig.DB_HOST,
    user: secretConfig.DB_USER,
    password: secretConfig.DB_PASSWORD,
    database: secretConfig.DB_NAME,
    timezone: '+01:00',
    port: 3306,
    dateStrings: true
  });
}
else if (secretConfig.ENVIRONMENT == "UBUNTU") {
  con = mysql.createPool({
    connectionLimit : 90,
    connectTimeout: 1000000,
    host: secretConfig.DB_HOST,
    user: secretConfig.DB_USER,
    password: secretConfig.DB_PASSWORD,
    database: secretConfig.DB_NAME,
    socketPath: '/var/run/mysqld/mysqld.sock',
    timezone: '+01:00',
    dateStrings: true
  });

  con2 = mysql2.createPool({
    connectionLimit : 90,
    connectTimeout: 1000000,
    host: secretConfig.DB_HOST,
    user: secretConfig.DB_USER,
    password: secretConfig.DB_PASSWORD,
    database: secretConfig.DB_NAME,
    socketPath: '/var/run/mysqld/mysqld.sock',
    timezone: '+01:00',
    dateStrings: true
  });
}

function toLocaleISOString(date) {
  function pad(number) {
      if (number < 10) {
          return '0' + number;
      }
      return number;
  }

  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) ;

}

app.get("/api/goals", (req, res) => {
  var sql = "SELECT * FROM goals";
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: result});
  });
});

app.get("/api/tasks/:goal_id", (req, res) => {
  var goal_id = req.params.goal_id;
  var sql = "SELECT * FROM tasks WHERE goal_id = ?";
  con.query(sql, [goal_id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "NOK", data: result});
  });
});

app.get("/api/actions", (req, res) => {
  var sql = "SELECT * FROM user_actions";
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: result});
  });
});

app.get("/api/inventory", (req, res) => {
  var sql = "SELECT * FROM inventory";
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: result});
  });  
});

app.get("/api/skills", (req, res) => {
  var sql = "SELECT * FROM skills";
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: result});
  });
});

app.post("/api/add-task", (req, res) => {
  var description = req.body.description;
  var type = req.body.type;
  var goal_id = req.body.goal_id;
  var xp = req.body.xp;

  var sql = "INSERT INTO tasks (description, type, goal_id, xp) VALUES (?, ?, ?, ?)";
  con.query(sql, [description, type, goal_id, xp], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: "Task added"});
  });
});

app.post("/api/add-goal", (req, res) => {
  var description = req.body.description;

  var sql = "INSERT INTO goals (description) VALUES (?)";
  con.query(sql, [description], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: "Goal added"});
  });
});

app.post("/api/add-action", (req, res) => {
  var task_id = req.body.task_id;
  var action = req.body.action;
  var report = req.body.report;
  var xp = req.body.xp;
  var completes_task = req.body.completes_task;
  var completed_at = toLocaleISOString(new Date());

  var sql = "INSERT INTO user_actions (task_id, action, report, xp, completes_task, completed_at) VALUES (?, ?, ?, ?, ?, ?)";
  con.query(sql, [task_id, action, report, xp, completes_task, completed_at], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: "Action added"});
  });
});

app.post("/api/add-skill", (req, res) => {
  var skill_name = req.body.skill_name;
  var skill_percentage = req.body.skill_percentage;

  var sql = "INSERT INTO skills (skill_name, skill_percentage) VALUES (?, ?)";
  con.query(sql, [skill_name, skill_percentage], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: "Skill added"});
  });
});

app.post("/api/add-item", (req, res) => {
  var item_name = req.body.item_name;
  var description = req.body.description;
  var qtt = req.body.qtt;

  var sql = "INSERT INTO inventory (item_name, description, qtt) VALUES (?, ?, ?)";
  con.query(sql, [item_name, description, qtt], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: "Item added"});
  });
});

app.post("/api/edit-skill", (req, res) => {
  var id = req.body.id;
  var skill_name = req.body.skill_name;
  var skill_percentage = req.body.skill_percentage;

  var sql = "UPDATE skills SET skill_name = ?, skill_percentage = ? WHERE id = ?";
  con.query(sql, [skill_name, skill_percentage, id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: "Skill edited"});
  });
});

app.post("/api/edit-item", (req, res) => {
  var id = req.body.id;
  var item_name = req.body.item_name;
  var description = req.body.description;
  var qtt = req.body.qtt;

  var sql = "UPDATE inventory SET item_name = ?, description = ?, qtt = ? WHERE id = ?";
  con.query(sql, [item_name, description, qtt, id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: "Item edited"});
  });
});

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
