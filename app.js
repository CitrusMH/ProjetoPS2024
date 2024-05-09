//Módulos Internos
const path = require('path');
//Módulos Externos
const express = require('express');
const session = require('express-session');
// Módulos do projeto
const connection = require('./database/database');

// models
const usuarios = require('./models/Usuarios');
const perfis = require('./models/Perfis');
const conquistas = require('./models/Conquistas');
const jogos = require('./models/Jogos');
const expansoes = require('./models/Expansoes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
// Sessions
app.use(session({
    secret: 'jogos',
    cookie: {
        maxAge: 120000,
    },
    resave: true,
    saveUninitialized: false
}));

// DB
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = app;
