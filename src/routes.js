//importa o express
const express = require('express');

//importando o devController para manipular os devs
const DevController = require('./controllers/DevController');

const LikeController = require('./controllers/LikeController');
const DeslikeController = require('./controllers/DeslikeController');

//importa a manipulação de rotas, essa variável irá executar todas as requisiçõe
const router = express.Router();

router.get("/", (req, res) => {
    return res.json({ "olá, mundo!": true });
});

router.post('/devs', DevController.store);
router.get('/devs', DevController.index);

router.post('/devs/:devId/likes', LikeController.store);
router.post('/devs/:devId/deslikes', DeslikeController.store);

module.exports = router