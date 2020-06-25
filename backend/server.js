const express = require('express');
const routes = require('./Routes/UserRoute')
const mongoose = require('mongoose');
const router = require('./Routes/UserRoute');

const app = express();

mongoose.Promise = global.Promise;


mongoose.connect("mongodb+srv://dbUsuario:dbContraseña@tareas.lbazp.mongodb.net/tasksapp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conexión correcta");
    app.listen(7001, () => {
        console.log("Servidor corriendo en http://localhost:7001/")
        app.use(express.json());
        app.use(router);
    });

}).catch((error) => {
    console.log(error);
})
