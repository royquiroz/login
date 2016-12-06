var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var autoIncrement = require("mongodb-autoincrement")


var encriptar = require('./encriptar')

registro = function(req, res) {

    var url = 'mongodb://localhost:27017/login';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log('Conectado correctamente a la BD')

        autoIncrement.getNextSequence(db, 'users', function(err, autoIndex) {

            var username = req.body.username
            var password = req.body.password


            if (username == "" || username == " ") {
                res.render('alta', {
                    userVacio: "Usuario no puede estar vacio",
                    passVacio: "Password no puede estar vacio"
                })
            } else if (password == "" || password == " ") {
                res.render('alta', {
                    passVacio: "Password no puede estar vacio",
                    username: username
                })
            } else {

                var passEncript = encriptar.encriptar(username, password)
                //console.log(passEncript)

                var query = {
                    _id: autoIndex,
                    username: username,
                    password: passEncript
                }

                var collection = db.collection('users');

                collection.findOne({
                    username: username
                }, function(err, user) {
                    //console.log(user.length)
                    if (!user) {
                        collection.insert(query, function(err, newUser) {
                            assert.equal(err, null)
                            //console.log(newUser)
                            //console.log("Se inserto un usuario con el id " + newUser.ops[0]._id)
                            res.render('index', {
                                texto: "Usuario creado con exito",
                                color: '#50b612'
                            })
                        })
                    } else {
                        //console.log("Usuario ya existe")
                        res.render('alta', {
                            msg: "Usuario ya existe",
                            color: '#1226b6'
                        })
                    }
                })
            }
        })
    })

}

exports.registro = registro;
