const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

module.exports = new Pool({
  connectionString: isProduction ? process.env.DB_PROD : process.env.DB_DEV
});