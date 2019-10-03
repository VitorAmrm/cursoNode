const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {

        //id do usuário logado
        const { user } = req.headers;

        //instância do banco do usuário logado
        const loggedDev = await Dev.findById(user);
        console.log(loggedDev.nome);
        //todos os devs que o usuário logado não deu like nem deslike
        const users = await Dev.find({
            $and: [ //and, todas as condições devem ser atendidas
                { _id: { $ne: user } }, //ne:user - não é o user
                { _id: { $nin: loggedDev.likes } }, //nin - não está na lista de likes do dev logado
                { _id: { $nin: loggedDev.deslikes } }, //nin - não está na lista de deslikes do dev logado
            ],
        });
        return res.json(users);
    },
    async store(req, res) {
        // console.log(req.body.nome);
        const { nome } = req.body;

        const useExist = await Dev.findOne({ nome: nome });
        if (useExist) {
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