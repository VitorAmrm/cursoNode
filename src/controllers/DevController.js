const axios = require('axios');

module.exports = {
    async store(req, res) {
        console.log("A merda vai feder!");
        return res.json(req.body);
    }
};