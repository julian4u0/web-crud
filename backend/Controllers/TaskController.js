const mongoose = require("mongoose")
const Task = require("../Models/TaskModel");

let taskController = {

    // Agregar tarea
    createTask: async (req, res, e) => {

        console.log(req.body)

        const { name, priority, expire, ownerid } = req.body;

        if (name && priority && expire && ownerid) {
            const task = {
                name: name,
                priority: priority,
                expire: new Date(),
                ownerid: ownerid
            };

            Task.create(task, (err, u) => {
                if (err) res.status(200).send(status(false, "Error del server" + err))
                res.status(200).send(status(true, "Tarea añadida"))
            })
        }
        else {
            res.status(200).send(status(false, "Faltan campos"))
        }
    },

    // Consultar todas las tareas de un usuario
    queryTasks: async (req, res, e) => {

        const { ownerid } = req.body;

        if(ownerid){
            Task.find({ ownerid: ownerid }, function (err, data) {
                if (err || data == null) {
                    // No se encontró entonces resolvemos con false
                    res.status(200).send(status(false, "No hay tareas"))
                }
                console.log(data)
                //Aca con los datos
                res.status(200).send(status(true, data))
            })

        }
        else{
            res.status(200).send(status(false, "Faltan campos"))

        }

    },
    deleteTask: async (req, res, e) => {

        const { taskid } = req.body;

        if(taskid){
            Task.findOneAndDelete({"_id": taskid}, function (err, data) {
                if (err || data == null) {
                    // No se encontró entonces resolvemos con false
                    res.status(200).send(status(false, "No se pudo borrar"))
                }
                else{
                    res.status(200).send(status(true, "Se borró"))  

                }
                              
            })

        }
        else{
            res.status(200).send(status(false, "Faltan campos"))

        }

    }

}

function status(success, data) {
    return { "success": success, "data": data }
}

//  Esta funcion devuelve false si no existe un usuario con el email que se envia
//  y los datos del usuario si existe el correo
async function findUserWithEmail(email) {
    //Promesa para esperar el resultado de consulta
    let promise = new Promise((res, rej) => {
        User.findOne({ email: email }, function (err, data) {
            if (err || data == null) {
                // No se encontró entonces resolvemos con false
                res(false);
            }
            console.log(data)
            //Aca con los datos
            res(data);
        })
    })
    // Aca esperamos que la promesa se resuelva
    return await promise;
}

module.exports = taskController;