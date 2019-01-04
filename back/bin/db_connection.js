let sequelize = require('./db_info');

sequelize.authenticate().then(()=>{
    console.log("Db connected!");
  }).catch(err=>{
    console.log("Db connection error: " + err);
    res.send("Connection error");
  });

  module.exports = sequelize;