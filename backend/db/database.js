const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: process.env.HOST,
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
