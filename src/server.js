//importando o express
const express = require('express');

//importando as rotas
const routes = require('./routes');

//criando o servidor
const server = express();

//importando o mongodb
//mongodb+srv://marcosLudgerio:35235638@cluster0-8nbmu.mongodb.net/dev?retryWrites=true&w=majority
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://marcosLudgerio:35235638@cluster0-8nbmu.mongodb.net/cursonode?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

//configurando as requisições para json
server.use(express.json());

//importando o arquivo routes.js
server.use(routes);


server.listen(8000, () => {
    console.log('Vai dar merda!');
});