const express = require('express'); //Import o framework express, ele vai que cuidar de todos os atributos e funções do servidor esse variável na verdade é uma função 

//IMPORTAÇÃO DO MOGOOSE, ACESSO AO MOGODB
const mongoose = require('mongoose');


//IMPORTAÇÃO DAS ROTAS, OS CAMINHOS
const routes = require('./routes')

//O QUE SOBE O SERVIDOR
const server = express();  

//CONEXÃO COM O MOGODB
mongoose.connect('mongodb+srv://marcosLudgerio:35235638@cluster0-8nbmu.mongodb.net/projetoNode?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true});

//CONFIGURANDO O SERVIDOR PARA COMUNICAÇÃO VIA JSON
server.use(express.json());

//USANDO AS ROTAS
server.use(routes);

//CONFIGURANDO A PORTA QUE A APLICAÇÃO VAI RODAR
server.listen(8000);

