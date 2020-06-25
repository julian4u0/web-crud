const mongoose = require("mongoose")
const User = require("../Models/UserModel");

let userController = {

    // Registro de Usuario
    createUser: async (req, res, e) => {

        console.log(req.body)

        const { email, password } = req.body;

        const mynewuser = findUserWithEmail(email);

        if (mynewuser) {
            res.status(200).send(status(false, "Correo en uso"))
        }
        else {
            const user = {
                email: email,
                password: password
            };

            User.create(user, (err, u) => {
                if (err) res.status(200).send(status(false, "Error del server"))
                res.status(200).send(status(true, "Usuario creado"))
            })
        }
    },

    //Ingreso de usuario
    loginUser: async (req, res, e) => {

        const { email, password } = req.body;

        //query para encontrar si ya existe usuario
        const myuser = await findUserWithEmail(email);

        if (myuser) {
            if (password == myuser.password) {
                res.status(200).send(status(true, myuser._id))
            } else {
                res.status(200).send(status(false, "Contraseña incorrecta"))
            }

        }
        else {
            res.status(200).send(status(false, "Usuario no existe"))

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

module.exports = userController;