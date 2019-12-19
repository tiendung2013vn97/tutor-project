module.exports = {
  db: {
    database: process.env.DB_NAME || "tutor",
    username: process.env.DB_USERNAME || "dung",
    password: process.env.DB_PASSWORD || "",
    port: process.env.DB_PORT || 3306,
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    pool: {
      max: 100,
      min: 0,
      idle: 3000,
      acquire: 30000
    }
  }
};
