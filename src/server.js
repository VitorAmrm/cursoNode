//importando o express
const express = require('express');

//importando as rotas
const routes = require('./routes');

//criando o servidor
const app = express();

const server = require('http').Server(app);

//import o socket.io
const io = require('socket.io')(server);

const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

//importando o mongodb
//mongodb+srv://marcosLudgerio:35235638@cluster0-8nbmu.mongodb.net/dev?retryWrites=true&w=majority
const mongoose = require('mongoose');



mongoose.connect("mongodb+srv://vitoramorim:vitor123@teste.tn2pq.mongodb.net/dev?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});


app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    
    return next();
});


//configurando as requisições para json
app.use(express.json());

//importando o arquivo routes.js
app.use(routes);

server.listen(8000, () => {
    console.log('Vai dar merda, vai!');
    console.log('retirei o cors');
});