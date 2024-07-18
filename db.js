const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER || "sqlserver",
  password: process.env.DB_PASSWORD || "Gatito06",
  server: process.env.DB_SERVER || "34.30.173.222",
  database: process.env.DB_NAME || "tiendita",
  options: {
    encrypt: false, 
    enableArithAbort: true
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed! Bad Config: ", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
