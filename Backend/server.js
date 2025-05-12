// Importa Express para crear la aplicación web
import express from "express";

// Importa CORS para permitir solicitudes desde otros dominios (por ejemplo, desde el frontend)
import cors from "cors";

// Importa los modelos y configuración de Sequelize (ORM para la base de datos)
import db from "./models/index.js";

// Importa la función de inicialización de roles
import { initial as initRoles } from "./config/init-db.js";

// Importa las rutas de autenticación (signup, signin)
import authRoutes from "./routes/auth.routes.js";

// Importa las rutas protegidas por roles de usuario
import userRoutes from "./routes/user.routes.js";

// Crea una instancia de la aplicación Express
const app = express();

// Configura las opciones de CORS para permitir acceso desde cualquier origen
const corsOptions = {
    origin: "*", // Permite solicitudes desde cualquier origen
    credentials: true
};

// Aplica el middleware de CORS a la aplicación
app.use(cors(corsOptions));

// Middleware para mostrar las solicitudes recibidas (para depuración)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});

// Middleware para analizar solicitudes con cuerpo en formato JSON
app.use(express.json());

// Middleware para analizar solicitudes con cuerpo en formato URL-encoded (formularios)
app.use(express.urlencoded({ extended: true }));

// Ruta simple para probar que el servidor está funcionando
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node.js JWT Authentication API." });
});

// Define la ruta base para autenticación: /api/auth/signup y /api/auth/signin
app.use("/api/auth", authRoutes);

// Define la ruta base para pruebas de acceso según el rol del usuario: /api/test/*
app.use("/api/test", userRoutes);

// Define el puerto en el que se ejecutará el servidor. Usa 8080 por defecto si no hay una variable de entorno
const PORT = process.env.PORT || 8080;

// Sincroniza los modelos con la base de datos
// Puedes usar { force: true } durante el desarrollo para reiniciar la base de datos
db.sequelize.sync({ force: true }).then(async () => {
    console.log("Database synchronized");
    
    // Inicializa los roles en la base de datos
    await initRoles();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});
