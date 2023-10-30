var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mysql = require('mysql2');
var mysql2 = require('mysql2/promise');
var secretConfig = require('./secret-config.json');
const OpenAI = require("openai");

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

const configuration = {
  apiKey: secretConfig.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

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
  var sql = "SELECT * FROM user_actions LIMIT 10";
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

app.get("/api/data", (req, res) => {
  var sql = "SELECT * FROM data";
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: result});
  });
});

app.post("/api/add-data-entry", (req, res) => {
  var description = req.body.description;
  var qtt_desc = req.body.qtt_desc;

  var sql = "INSERT INTO data (description, qtt_desc) VALUES (?, ?)";
  con.query(sql, [description, qtt_desc], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: "Data entry added"});
  });
});

app.post("/api/delete-data-entry", (req, res) => {
  var id = req.body.id;

  var sql = "DELETE FROM data WHERE id = ?";
  con.query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: "Data entry deleted"});
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

app.post("/api/delete-task", (req, res) => {
  var task_id = req.body.task_id;

  var sql = "DELETE FROM tasks WHERE id = ?";
  con.query(sql, [task_id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: "Task deleted"});
  });
});

app.post("/api/add-goal", (req, res) => {
  var description = req.body.description;
  var priority = req.body.priority;

  var sql = "INSERT INTO goals (description, priority) VALUES (?, ?)";
  con.query(sql, [description, priority], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: "Goal added"});
  });
});

app.post("/api/delete-goal", (req, res) => {
  var id = req.body.id;

  var sql = "DELETE FROM goals WHERE id = ?";
  con.query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: "Goal deleted"});
  });
});

app.post("/api/add-action", (req, res) => {
  var task_id = req.body.task_id;
  var action = req.body.action;
  var report = req.body.report;
  var xp = req.body.xp;
  var qtt = req.body.qtt;
  var completes_task = req.body.completes_task;
  var completed_at = toLocaleISOString(new Date());

  var sql = "INSERT INTO user_actions (task_id, action, report, xp, qtt, completes_task, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
  con.query(sql, [task_id, action, report, xp, qtt, completes_task, completed_at], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: "Action added"});
  });
});

app.post("/api/delete-action", (req, res) => {
  var id = req.body.id;

  var sql = "DELETE FROM user_actions WHERE id = ?";
  con.query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: "Action deleted"});
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

app.post("/api/delete-skill", (req, res) => {
  var id = req.body.id;

  var sql = "DELETE FROM skills WHERE id = ?";
  con.query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: "Skill deleted"});
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

app.post("/api/delete-item", (req, res) => {
  var id = req.body.id;

  var sql = "DELETE FROM inventory WHERE id = ?";
  con.query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: "Item deleted"});
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

app.get("/api/get-stats", async (req, res) => {
  var sql1 = "SELECT SUM(xp * qtt) AS xp FROM user_actions";
  try {
    var [rows1, fields1] = await con2.query(sql1);
    var xp = rows1[0].xp;

    var level = 0;
    var level_xp = 0;
    for (var i = 0; i <= 10000; i++) {
      level_xp += i * 1000;
      if (xp >= level_xp) {
        level++;
      }
      else {
        break;
      }
    }

    var sql2 = "SELECT COUNT(*) AS nr_skills FROM skills WHERE skill_percentage = 100";
    var [rows2, fields2] = await con2.query(sql2);
    var nr_skills = rows2[0].nr_skills;

    var sql3 = `
      WITH raw AS (
        SELECT DISTINCT(goals.id)
        FROM goals
        INNER JOIN tasks ON goals.id = tasks.goal_id
        INNER JOIN user_actions ON tasks.id = user_actions.task_id
        WHERE (SELECT COUNT(*) FROM tasks WHERE goal_id = goals.id) = (SELECT COUNT(*) FROM user_actions WHERE task_id IN (SELECT id FROM tasks WHERE goal_id = goals.id) AND completes_task = 1)
      )
      SELECT COUNT(*) AS nr_goals_completed FROM raw
    `;
    var [rows3, fields3] = await con2.query(sql3);
    var nr_goals_completed = rows3[0].nr_goals_completed;

    var sql4 = "SELECT SUM(qtt) AS nr_items FROM inventory";
    var [rows4, fields4] = await con2.query(sql4);
    var nr_items = rows4[0].nr_items;

    var data = {
      xp: xp,
      level: level,
      nr_skills: nr_skills,
      nr_goals_completed: nr_goals_completed,
      nr_items: nr_items
    }

    console.log(data);
  
    res.json({status: "OK", data: data});
  }
  catch(err) {
    console.log(err);
    res.json({status: "NOK", error: err.message});
  }
});

async function getQuest(task) {
  var prompt = "Act as a Dungeon Master in a sci-fi RPG and write me a quest. Leave out the XP reward. The quest should end up in the player doing the following task: ";
  prompt += task.description;
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{"role": "user", "content": prompt}],
  });
  console.log(completion.choices[0].message);
  var message = completion.choices[0].message;
  return message.content;
}

async function getReportFeeedback(action, report) {
  var prompt = "Act as a Dungeon Master in a sci-fi RPG and give some feedback to the player after he has completed a quest and written the following report: \n\n";
  prompt += action + "\n\n" + report;
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{"role": "user", "content": prompt}],
  });
  console.log(completion.choices[0].message);
  var message = completion.choices[0].message;
  return message.content;
}

app.post("/api/get-quest", async (req, res) => {
  var sql = "SELECT *, goals.priority FROM tasks INNER JOIN goals ON tasks.goal_id = goals.id";
  var [rows, fields] = await con2.query(sql);

  var tasks = [];
  for (var i in rows) {
    for (var j = 0; j < rows[i].priority; j++) {
      tasks.push(rows[i]);
    }
  }

  var task = tasks[Math.floor(Math.random() * tasks.length)];
  var quest = await getQuest(task);

  var sql2 = "INSERT INTO posts (body, role) VALUES (?, 'assistant')";
  await con2.query(sql2, [quest]);

  res.json({status: "OK", data: {quest: quest, task_id: task.id, xp: task.xp}});
});

app.post("/api/get-report-feedback", async (req, res) => {
  var action = req.body.action;
  var report = req.body.report;
  var feedback = await getReportFeeedback(action, report);

  var sql2 = "INSERT INTO posts (body, role) VALUES (?, 'assistant')";
  await con2.query(sql2, [feedback]);

  res.json({status: "OK", data: feedback});
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
