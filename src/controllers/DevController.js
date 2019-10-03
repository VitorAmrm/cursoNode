const axios = require('axios');

const Dev = require('../models/Dev');


module.exports = {
    async store(req, res) {
        // console.log(req.body.nome);
        const { nome } = req.body;

        const useExist = await Dev.findOne({ user: nome });
        console.log(useExist);
        if(useExist){
            console.log("Usuário encontrado");
            return res.json(useExist);
        }

        const response = await axios.get(`https://api.github.com/users/${nome}`);

        const { name: user, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            nome,
            user,
            bio,
            avatar
        });

        return res.json(dev);
    }
};