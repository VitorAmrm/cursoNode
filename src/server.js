//importando o express
const express = require('express');

//importando as rotas
const routes = require('./routes');

//criando o servidor
const server = express();

//importando o mongodb
//mongodb+srv://marcosLudgerio:35235638@cluster0-8nbmu.mongodb.net/dev?retryWrites=true&w=majority
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://marcosLudgerio:35235638@cluster0-8nbmu.mongodb.net/cursonode?retryWrites=true&w=majority"), { useNewUrlParser: true }, { useUnifiedTopology: true };

//importando o arquivo routes.js
server.use(routes)

//configurando as requisições para json
server.use(express.json())

server.listen(3030);