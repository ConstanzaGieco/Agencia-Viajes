//Estamos importando express asignandola a la variable express, luego la llamamos con app y le asignamos un evento de listen para que imprima el puerto el cual fue asignado para el proyecto. En principio, como estamos en local el puerto va a ser 4000 pero una vez que hagamos el deployment la variable process ya va a existir y ya no va a aparecer 4000 si no otro número.

/* const express = require('express'); */
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

const port = process.env.PORT || 4000;

//Conectar la base de datos (se creo una base de datos en XAMPP/phpmyadmin llamada nodeudemy)
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual (next es para que pase al siguiente paso)
app.use((req, res, next) =>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes';
    return next();
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//Definir la carpeta publica (donde esta el css, imagenes, etc todo lo estatico)
app.use(express.static('public'));

//agregar el router a la app. Lo que hacemos con use es desde la pagina principal agregar todas las rutas que hemos definido en router. Use basicamente abarca todos las acciones posibles que se pueden hacer con una pagina (get, post, delete, patch, put y delete)
app.use('/', router);

app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puesto ${port}`)
})