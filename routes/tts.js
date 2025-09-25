var express = require('express');
var router = express.Router();
var {getMySQLConnections} = require("../libs/database");
var {getPolly} = require("../libs/polly");
var fs = require("fs");

var {con, con2} = getMySQLConnections();
var Polly = getPolly();

router.get("/api/text-to-speech", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var id = req.query.id;

  if (fs.existsSync("speech/"+id+".mp3")) {
    res.json({status: "OK", data: "Audio file exists."});
    return;
  }

  var sql = "SELECT * FROM posts WHERE id = ?;";
  var params = [id];
  con.query(sql, params, function(err, result) {
    if (err) {
      console.log(err);
      res.json({status: "NOK", error: err.message});
      return;
    }
    var content = result[0].body;
    if (content.length > 3000) {
      content = content.substring(0, 3000);
    }
    var params = {
      OutputFormat: "mp3",
      Text: content,
      VoiceId: "Emma"
    };
    Polly.synthesizeSpeech(params, function(err, data) {
      if (err) {
        console.log(err);
        res.json({status: "NOK", error: err.message});
        return;
      }
      fs.writeFile("speech/"+id+".mp3", data.AudioStream, function(err) {
        if (err) {
          console.log(err);
          res.json({status: "NOK", error: err.message});
          return;
        }
        res.json({status: "OK", data: "Audio file created successfully."});
      });
    });
  });
});

router.get("/api/get-audio", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var id = req.query.id;

  res.sendFile(path.resolve(__dirname) + "/speech/"+id+".mp3");
});

module.exports = router;