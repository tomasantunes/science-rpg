var express = require('express');
var router = express.Router();
var {getMySQLConnections} = require("../libs/database");

var {con, con2} = getMySQLConnections();

router.get("/api/skills", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var sql = "SELECT * FROM skills";
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: result});
  });
});

router.post("/api/add-skill", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

router.post("/api/delete-skill", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

router.post("/api/edit-skill", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

module.exports = router;