const axios = require('axios');

module.exports = {
    async store(req, res){
        const {nome} = req.body,
        const response = await axios.get(`https://api.github.com/users/${nome}`)
        return res.json(response.data);
    }
};