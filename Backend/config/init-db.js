// Importamos los modelos de la base de datos
import db from "../models/index.js";

const Role = db.role;

// Función para inicializar roles en la base de datos
const initial = async () => {
  try {
    // Contamos si hay roles en la base de datos
    const count = await Role.count();
    
    // Si no hay roles, creamos los roles predeterminados
    if (count === 0) {
      // Creamos el rol "user"
      await Role.create({
        id: 1,
        name: "user"
      });
      console.log("Added 'user' to roles table");

      // Creamos el rol "moderator" 
      await Role.create({
        id: 2,
        name: "moderator"
      });
      console.log("Added 'moderator' to roles table");

      // Creamos el rol "admin"
      await Role.create({
        id: 3,
        name: "admin"
      });
      console.log("Added 'admin' to roles table");
    }
  } catch (error) {    console.error("Error initializing roles:", error);
  }
};

// Exportamos la función de inicialización
export { initial };
