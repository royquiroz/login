encriptar = function(user, pass) {
   var crypto = require('crypto')
   // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
   var newPass = crypto.createHmac('sha1', user).update(pass).digest('hex')
   return newPass
}
exports.encriptar = encriptar;
