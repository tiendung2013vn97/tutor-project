module.exports = {
  db: {
    database: process.env.DB_NAME || "tutor",
    username: process.env.DB_USERNAME || "dung",
    password: process.env.DB_PASSWORD || "",
    port: process.env.DB_PORT || 3307,
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    pool: {
      max: 100,
      min: 0,
      idle: 3000,
      acquire: 30000
    }
  },

  url: process.env.URL || "http://localhost:3002",
  maxCount: 1000000000
};
