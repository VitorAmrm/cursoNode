//importando o express
const express = require('express');

//importando as rotas
const routes = require('./routes');

//criando o servidor
const server = express();

//importando o mongodb
//mongodb+srv://marcosLudgerio:35235638@cluster0-8nbmu.mongodb.net/dev?retryWrites=true&w=majority
const mongoose = require('mongoose');

//cors permite que qualquer aplicação acesse o back end
//sem ele, quando o react ou qualquer outra aplicação for acessar o banco, seria bloqueado pelo node
const cors = require('cors');

mongoose.connect("mongodb+srv://marcosLudgerio:35235638@cluster0-8nbmu.mongodb.net/cursonode?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});


//usando o cors
server.use(cors());

//configurando as requisições para json
server.use(express.json());

//importando o arquivo routes.js
server.use(routes);

server.listen(8000, () => {
    console.log('Vai dar merda!');
});