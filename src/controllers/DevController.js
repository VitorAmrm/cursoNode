const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {

        //id do usuário logado
        const { user } = req.headers;

        //instância do banco do usuário logado
        const loggedDev = await Dev.findById(user);
        
        //todos os devs que o usuário logado não deu like nem deslike
        const users = await Dev.find();
        return res.json(users);
    },
    async store(req, res) {
        // console.log(req.body.nome);
        const { nome } = req.body;

        const useExist = await Dev.findOne({ nome: nome });
        if (useExist) {
            return res.json(useExist);
        }

        const response = await axios.get(`https://api.github.com/users/${nome}`);

        const { login: user, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            nome,
            user,
            bio,
            avatar
        });

        return res.json(dev);
    }

};