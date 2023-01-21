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
pool ? console.log("conectado") : console.log("error de coneccion")

// console.log(pool)


module.exports = pool;
