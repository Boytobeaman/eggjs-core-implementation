module.exports = {
  db: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'kaikebab',
    "username": "root",
    "password": null,
  },
  middleware: [
    "logger"
  ]
}