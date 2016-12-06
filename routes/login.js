var MongoClient = require('mongodb').MongoClient
var assert = require('assert')


var encriptar = require('./encriptar')

login = function(req, res) {

    var url = 'mongodb://localhost:27017/login';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log('Conectado correctamente a la BD')

        var username = req.body.username
        var password = req.body.password


        if (username == "" || username == " ") {
            res.render('login', {
                userVacio: "Usuario no puede estar vacio",
                passVacio: "Password no puede estar vacio"
            })
        } else if (password == "" || password == " ") {
            res.render('login', {
                passVacio: "Password no puede estar vacio",
                username: username
            })
        } else {

            var passEncript = encriptar.encriptar(username, password)

            var collection = db.collection('users');

            collection.findOne({
                username: username/*,
                password: passEncript*/
            }, function(err, user) {
                //console.log(passEncript)
                //console.log(user.password)
                if (!user) {
                    res.render('index', {
                        texto: "Usuario no existe",
                        color: '#b62f12'
                    })
                } else if (passEncript != user.password) {
                    res.render('login', {
                        username: username,
                        msg: "Contraseña incorrecta",
                        color: '#1226b6'
                    })
                } else {
                    //console.log("Usuario ya existe")
                    res.render('inicio', {
                        username: username
                    })
                }
            })
        }
    })

}

exports.login = login;
