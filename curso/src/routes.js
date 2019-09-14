const express = require('express');
const DevController = require('./controllers/DevController');

const router = express.Router();


router.get('/', function (req, res) {
    return res.json({ menssagem: `Hello ${req.query.nome}` });
});

router.post('/devs', DevController.store);

module.exports = router
