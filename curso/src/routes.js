//IMPORTAÇÃO DO EXPRESS
const express = require('express');
//IMPORTAÇÃO DO DEVCONTROLLER, PRA ACESSAR OS ATRIBUTOS DO DEV
const DevController = require('./controllers/DevController');
//IMPORTAÇÃO DO LIKE
const LikeController = require('./controllers/LikeController');
//IMPORTAÇÃO DO DESLIKE
const DeslikeController = require('./controllers/DeslikeController');
//IMPORTAÇÃO DAS ROTAS
const router = express.Router();

//CASO A REQUISIÇÃO ESTEJA SÓ COM A BARRA, SEM OUTRA COISA, ELE RETORNA UM JSON
router.get('/', function (req, res) {
    return res.json({ menssagem: `Hello ${req.query.nome}` });
});

//REQUISIÇÃO GET - QUANDO EU REQUISITO A PÁGINA COM A URL DEVS ELE RETORNA OS JSONs DOS DEVS QUE O DEV LOGADO NEM DEU LIKE NEM DESLIKE
router.get('/devs', DevController.index);

//REQUISIÇÃO POST, EU CADASTRO UM NOVO DEV NO BANCO DE DADOS REMOTO
router.post('/devs', DevController.store);
//MANDANDO O ID DO DEV, SERÁ EXIBIDO OS DEVS QUE DEU LIKE E QUE DERAM DESLIKE NELE
router.post('/devs/:devId/likes', LikeController.store);
router.post('/devs/:devId/deslikes', DeslikeController.store);

//EXPORTANDO AS ROTAS
module.exports = router
