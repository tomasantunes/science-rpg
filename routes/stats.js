var express = require('express');
var router = express.Router();
var {getMySQLConnections} = require("../libs/database");

var {con, con2} = getMySQLConnections();

router.get("/api/get-stats", async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var sql1 = "SELECT SUM(xp * qtt) AS xp FROM user_actions";
  try {
    var [rows1, fields1] = await con2.query(sql1);
    var xp = rows1[0].xp;

    var level = 0;
    var level_xp = 0;
    var next_level_xp = 0;
    for (var i = 0; i <= 10000; i++) {
      level_xp += i * 1000;
      if (xp >= level_xp) {
        level++;
      }
      else {
        next_level_xp = level_xp;
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
      next_level_xp: next_level_xp,
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

module.exports = router;