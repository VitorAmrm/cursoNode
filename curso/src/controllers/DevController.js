const axios = require('axios'); // AXIOS É O FRAMEWORK QUE VAI FAZER A COMUNICAÇÃO COM A API DO GIT

//IMPORTANDO OS DEVS PARA TER ACESSO SO ATRIBUTOS
const Dev = require('../models/Dev');

//NO CONTROLLER É RECOMENDÁVEL TER APENAS OS CINCO MÉTODOS FUNDAMENTAOIS: INDEX, DELETE, STORE E OUTROS, SE PRECISAR DE QUALQUER OUTRO ALÉM DOS CINCO É NECESSÁRIO CRIAR UM NOVO CONTROLER, POR ISSO LIKES E DESLIKES NÃO ESTÃO AQUI
module.exports = {
    //PESQUISAS OS DEVS CADASTRADOS NO SISTEMAS, MAS SÓ RETORNA AQUELES QUE O USUÁRIO LOGADO NÃO DEU LIKE NEM DESLIKE
    async index(req, res) {
        //USER ARMAZENA O ID DO DEV QUE TÁ LOGADO NO SISTEMAS
        const { user } = req.headers;
        //COM O ID DO USUÁRIO É POSSÍVEL OBTER A INSTANCIA DELE NO BANCO DE DADOS, LOGGEDDEV ARMAZENA ELE
        const loggedDev = await Dev.findById(user);
        //AQUI EU RETORNO OS USUÁRIOS QUE ESTÃO CADASTRADOS NO SISTEMAS QUE O LOGGEDDEV NÃO DEU LIKE NEM DESLIDE
        const users = await Dev.find({
            $and: [//RETORNA UM ARRAY DE OBJETOS QUE OBEDECEM AS TRÊS CONDIÇÕES AO MESMO TEMPO
                { _id: { $ne: user } },//$NE - NOT END, NÃO É O USUÁRIO CADASTRADO
                { _id: { $nin: loggedDev.likes } },//$NIN - NOT IN, NÃO ESTÁ NA LISTA DE LIKES DO USUÁRIO LOGADO
                { _id: { $nin: loggedDev.deslikes } },//$NIN - NOT IN, NÃO ESTÁ NA LISTA DE DESLIKES DO USUÁRIO LOGADO
            ],
        });
        return res.json(users);//RETORNA OS USUÁRIOS QUE OBEDECE AS CONDIÇÕES
    },
    //CADASTRA UM NOVO DEV NO SISTEMA
    async store(req, res) {
        const { nome } = req.body;//PEGA O NOME NA REQUISIÇÃO

        const userExist = await Dev.findOne({ user: nome })//CONFERE SE O USUÁRIO QUE FOI ENVIADO NA REQUISIÇÃO JÁ TA CADASTRADO NO SISTEMA
        if (userExist) {
            return res.json(userExist);//SE TIVER, SÓ RETORNA O USUÁRIO
        }

        const response = await axios.get(`https://api.github.com/users/${nome}`)//SE NÃO TIVER, USA API DO GITHUB PARA BUSCAR O JSON DO USUÁRIO

        //DA REQUISIÇÃO RECEBIDA, ARMAZENA APENAS O NOME, A BIO E O URL DA FOTO
        const { name, bio, avatar_url } = response.data;
        
        //CREATE NOVO USUÁRIO, ISSO ARMAZENA NO MONGODB
        const dev = await Dev.create({
            nome: name,
            user: nome,
            bio,
            avatar: avatar_url
        });

        return res.json(dev);
    }
};