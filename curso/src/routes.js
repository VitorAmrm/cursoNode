const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DeslikeController = require('./controllers/DeslikeController');

const router = express.Router();


router.get('/', function (req, res) {
    return res.json({ menssagem: `Hello ${req.query.nome}` });
});


router.get('/devs', DevController.index);


router.post('/devs', DevController.store);
router.post('/devs/:devId/likes', LikeController.store);
router.post('/devs/:devId/deslikes', DeslikeController.store);


module.exports = router
