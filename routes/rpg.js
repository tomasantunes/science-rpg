var express = require('express');
var router = express.Router();
var {getMySQLConnections} = require("../libs/database");
var {getQuest, getReportFeeedback} = require("../libs/openai");

var {con, con2} = getMySQLConnections();

router.post("/api/get-quest", async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var sql = "SELECT tasks.*, goals.priority FROM tasks INNER JOIN goals ON tasks.goal_id = goals.id WHERE tasks.is_quest = 1";
  var [rows, fields] = await con2.query(sql);

  if (rows.length < 1) {
    res.json({status: "NOK", error: "No quests available."});
    return;
  } 

  var tasks = [];
  for (var i in rows) {
    for (var j = 0; j < rows[i].priority; j++) {
      tasks.push(rows[i]);
    }
  }

  var task = tasks[Math.floor(Math.random() * tasks.length)];
  var quest = await getQuest(task);

  var sql2 = "INSERT INTO posts (body, role) VALUES (?, 'assistant')";
  var insert = await con2.query(sql2, [quest]);

  res.json({status: "OK", data: {quest: quest, task_id: task.id, xp: task.xp, task_description: task.description, post_id: insert[0].insertId}});
});


router.post("/api/get-report-feedback", async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var action = req.body.action;
  var report = req.body.report;
  var feedback = await getReportFeedback(action, report);

  var sql2 = "INSERT INTO posts (body, role) VALUES (?, 'assistant')";
  var insert = await con2.query(sql2, [feedback]);

  res.json({status: "OK", data: {feedback: feedback, post_id: insert[0].insertId}});
});

module.exports = router;