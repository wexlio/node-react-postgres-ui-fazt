const { Pool } = require("pg");
const { db } = require('./config')

const credentials = {
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
};

const pool = new Pool(credentials);

pool.connect((error) => {
  if (error) {
    console.log("Fail conection. Error: ", error)
  } else console.log("Conection success")
})

// console.log(pool)


module.exports = pool;
