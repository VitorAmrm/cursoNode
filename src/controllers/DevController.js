const axios = require('axios');

const Dev = require('../models/Dev');


module.exports = {
    async store(req, res) {
        // console.log(req.body.nome);
        const { nome } = req.body;

        const response = await axios.get(`https://api.github.com/users/${nome}`);

        const {name: user, bio, avatar_url: avatar} = response.data;

        const dev = await Dev.create({ 
            nome,
            user, 
            bio,
            avatar
        });

        return res.json(dev);
    }
};