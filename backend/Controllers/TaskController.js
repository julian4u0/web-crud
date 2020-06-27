//const mongoose = require("mongoose")
const Task = require("../Models/TaskModel");

let taskController = {

    // Agregar tarea
    createTask: async (req, res, e) => {

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
                console.log("Se añadió una tarea correctamente")
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
                    console.log("Se borró una tarea correctamente")
                    res.status(200).send(status(true, "Se borró"))  

                }
                              
            })

        }
        else{
            res.status(200).send(status(false, "Faltan campos"))

        }

    }, 
    updateTask: async (req, res, e) => {

        const { taskid, name, priority, expire } = req.body;

        if(taskid && name && priority && expire){
            Task.findOneAndUpdate({"_id": taskid}, {"name" : name, "priority" : priority, "expire" : expire}, function (err, data) {
                if (err || data == null) {
                    // No se encontró entonces resolvemos con false
                    res.status(200).send(status(false, "No se pudo borrar"))
                }
                else{
                    console.log("Se actualizo una tarea correctamente")
                    res.status(200).send(status(true, data))  

                }
                              
            })

        }
        else{
            res.status(200).send(status(false, "Faltan campos"))

        }

    }, 


}

function status(success, data) {
    return { "success": success, "data": data }
}

module.exports = taskController;