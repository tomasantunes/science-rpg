var {getMySQLConnections} = require('./database');
var { con, con2 } = getMySQLConnections();

async function getAllDataJSON() {
  var sql1 = "SELECT * FROM goals";
  var [rows1, fields1] = await con2.query(sql1);

  var sql2 = "SELECT * FROM tasks";
  var [rows2, fields2] = await con2.query(sql2);

  var sql3 = "SELECT * FROM user_actions";
  var [rows3, fields3] = await con2.query(sql3);

  var sql4 = "SELECT * FROM skills";
  var [rows4, fields4] = await con2.query(sql4);

  var sql5 = "SELECT * FROM inventory";
  var [rows5, fields5] = await con2.query(sql5);

  var sql6 = "SELECT * FROM data";
  var [rows6, fields6] = await con2.query(sql6);

  var data = {
    goals: rows1,
    tasks: rows2,
    user_actions: rows3,
    skills: rows4,
    inventory: rows5,
    data: rows6
  };

  return JSON.stringify(data);
}

module.exports = {
  getAllDataJSON,
  default: {
    getAllDataJSON
  }
};