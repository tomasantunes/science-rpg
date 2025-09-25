var express = require('express');
var router = express.Router();
var {getMySQLConnections} = require("../libs/database");

var {con, con2} = getMySQLConnections();

router.get("/api/data", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var sql = "SELECT * FROM data";
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message})
    }
    res.json({status: "OK", data: result});
  });
});

router.post("/api/add-data-entry", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

router.post("/api/delete-data-entry", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

module.exports = router;