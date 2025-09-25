/*
var express = require('express');
var router = express.Router();
var {getMySQLConnections} = require("../libs/database");
var {getChatResponse} = require("../libs/openai");

var {con, con2} = getMySQLConnections();
router.post("/api/get-chat-response", async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.json({status: "NOK", error: "Invalid Authorization."});
    return;
  }

  var chat_input = req.body.chat_input;

  var sql = "INSERT INTO posts (body, role) VALUES (?, 'user')";
  await con2.query(sql, [chat_input]);

  var response = await getChatResponse(chat_input);

  var sql2 = "INSERT INTO posts (body, role) VALUES (?, 'assistant')";
  await con2.query(sql2, [response]);

  res.json({status: "OK", data: response});
});

module.exports = router;
*/

