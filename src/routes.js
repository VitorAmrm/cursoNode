//importa o express
const express = require('express');

//importando o devController para manipular os devs
const DevController = require('./controllers/DevController')

//importa a manipulação de rotas, essa variável irá executar todas as requisiçõe
const router = express.Router();

router.get("/", function(req, res){
    return res.json({"olá, mundo!": true});
});

router.post('/devs',  DevController.store);

module.exports = router