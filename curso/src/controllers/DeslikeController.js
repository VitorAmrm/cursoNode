const Dev = require('../models/Dev');
//5d7d4d064f2bef19bcdf9b94 - id marcos ludgerio
//5d7d548ec87cd0273c3dfa0a - id camila tereza
module.exports = {
    async store(req, res) {
        const {devId} = req.params;
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user); // ID do dev logado
        const targetDev = await Dev.findById(devId);// ID do dev que recebeu o like
        
        if(!targetDev){
            return res.status(400).json({ error: "Dev not exist" });
        }

        loggedDev.deslikes.push(targetDev._id);

        await loggedDev.save();
        
        return res.json(loggedDev);
    }
}; 