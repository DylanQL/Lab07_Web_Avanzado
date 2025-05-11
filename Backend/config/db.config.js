// app/config/db.config.js
export default {
    dialect: "sqlite",
    storage: "./database.sqlite", // El archivo de la base de datos SQLite
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};