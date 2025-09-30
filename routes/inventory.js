var express = require('express');
var router = express.Router();
var {getMySQLConnections} = require("../libs/database");
var secretConfig = require("../secret-config");
var axios = require("axios");

var {con, con2} = getMySQLConnections();

router.get("/api/inventory", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var sql = "SELECT * FROM inventory";
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
    }
    res.json({status: "OK", data: result});
  });  
});

router.post("/api/add-item", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

router.post("/api/edit-item", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

router.post("/api/delete-item", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

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

router.post("/api/export-inventory-to-pfc3", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var sql = "SELECT item_name, description, qtt FROM inventory";
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
      return;
    }

    axios.post(secretConfig.PFC3_URL + "/external/upsert-inventory", {
      api_key: secretConfig.PFC3_API_KEY,
      inventory: result
    }).then(response => {
      if (response.data.status === "NOK") {
        res.json({status: "NOK", error: response.data.error});
        return;
      }
      res.json({status: "OK", data: "Inventory exported to PFC3."});
    }).catch(error => {
      console.log(error);
      res.json({status: "NOK", error: error.message});
    });
  });
});

module.exports = router;