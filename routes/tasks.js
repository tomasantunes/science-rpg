var express = require('express');
var router = express.Router();
var {getMySQLConnections} = require("../libs/database");

var {con, con2} = getMySQLConnections();

router.get("/api/tasks/:goal_id", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

router.post("/api/add-task", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var description = req.body.description;
  var type = req.body.type;
  var goal_id = req.body.goal_id;
  var xp = req.body.xp;
  var is_quest = req.body.is_quest == true ? 1 : 0;

  var sql = "INSERT INTO tasks (description, type, goal_id, xp, is_quest) VALUES (?, ?, ?, ?, ?)";
  con.query(sql, [description, type, goal_id, xp, is_quest], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: "Task added"});
  });
});

router.post("/api/delete-task", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

router.post("/api/edit-task", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."})
    return;
  }

  var id = req.body.id;
  var description = req.body.description;
  var type = req.body.type;
  var goal_id = req.body.goal_id;
  var xp = req.body.xp;
  var is_quest = req.body.is_quest == true ? 1 : 0;

  var sql = "UPDATE tasks SET description = ?, type = ?, goal_id = ?, xp = ?, is_quest = ? WHERE id = ?";
  con.query(sql, [description, type, goal_id, xp, is_quest, id], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: "Task edited"});
  });
});

module.exports = router;