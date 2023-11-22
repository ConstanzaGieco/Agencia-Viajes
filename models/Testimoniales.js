import { Sequelize } from "sequelize";
import db from "../config/db.js";

//NORMALMENTE A ESTE TIPO DE ARCHIVOS SE LOS EMPIEZA CON MAYUSCULA
export const Testimonial = db.define('testimoniales', {
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
});