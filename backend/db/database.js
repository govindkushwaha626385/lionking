const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "homeawaydb.cxw6ksomulba.eu-north-1.rds.amazonaws.com",
  database: "homeaway",
  password: "Homeaway626385",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
},
});

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "room",
//   password: "myPassword",
//   port: 5432,
// });
module.exports = pool;
