/*Modulos Principales*/
var express = require('express')
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var nunjucks = require('nunjucks')
var bodyParser = require('body-parser')
var app = express()
var path = require('path')


/*Configuraciones de renderizado*/
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
nunjucks.configure('views', {
    autoescape: true,
    express: app
});


/*Funciones propias exportadas*/
var alta = require('./routes/alta')
var login = require('./routes/login')

/* Peticiones <--GET--> */
//app.get('/search', alta.busqueda)


app.get('/', function(req, res) {
    res.render('index')
})
app.get('/alta', function(req, res) {
    res.render('alta')
})
app.get('/login', function(req, res) {
    res.render('login')
})




/* Peticiones <--POST--> */
app.post('/alta', alta.registro)
app.post('/login', login.login)


app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
