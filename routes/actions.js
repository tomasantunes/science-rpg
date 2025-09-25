var express = require('express');
var router = express.Router();
var {getMySQLConnections} = require("../libs/database");

var {con, con2} = getMySQLConnections();

router.get("/api/actions", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var dt = req.query.dt;
  var sql = "SELECT * FROM user_actions WHERE DATE(completed_at) = ?";
  con.query(sql, [dt], function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: result});
  });
});

router.post("/api/add-action", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

router.post("/api/delete-action", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

module.exports = router;