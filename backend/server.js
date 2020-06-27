const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/AppRoutes');

const app = express();

mongoose.Promise = global.Promise;


mongoose.connect("mongodb+srv://dbUsuario:dbContraseña@tareas.lbazp.mongodb.net/tasksapp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conexión correcta");
    app.listen(7001, () => {
        console.log("Servidor corriendo en http://localhost:7001/")
        app.use(express.json());
        app.use("/api", router);
    });

}).catch((error) => {
    console.log(error);
})
