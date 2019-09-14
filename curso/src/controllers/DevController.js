const axios = require('axios');

const Dev = require('../models/Dev');


module.exports = {
    async store(req, res) {
        const { nome } = req.body;

        const userExist = await Dev.findOne({ user:nome })
        if(userExist){
            return res.json(userExist);
        }

        const response = await axios.get(`https://api.github.com/users/${nome}`)

        const { name, bio, avatar_url } = response.data;

        const dev = await Dev.create({
            nome: name,
            user: nome,
            bio,
            avatar: avatar_url
        });

        return res.json(dev);
    }
};