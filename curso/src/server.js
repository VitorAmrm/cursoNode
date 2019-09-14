const express = require('express'); //Import o framework express, ele vai que cuidar de todos os atributos e funções do servidor esse variável na verdade é uma função 

const mongoose = require('mongoose');

const routes = require('./routes')

const server = express();  

mongoose.connect('mongodb+srv://marcosLudgerio:35235638@cluster0-8nbmu.mongodb.net/projetoNode?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true});
server.use(express.json());
server.use(routes);

server.listen(8000);

