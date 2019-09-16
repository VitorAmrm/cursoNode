const Dev = require('../models/Dev');
//5d7d4d064f2bef19bcdf9b94 - id marcos ludgerio
//5d7d548ec87cd0273c3dfa0a - id camila tereza
//5d7d54abc87cd0273c3dfa0b - id vitor amorim

module.exports = {
    async store(req, res) {//CADASTRAR UM NOVO LIKE
        const {devId} = req.params;//ID DO DEV QUE RECEBEU O LIKE
        const {user} = req.headers;//ID DO DEV LOGADO NO SISTEMA, O QUE DEU O LIKE

        const loggedDev = await Dev.findById(user); // ID do dev logado
        const targetDev = await Dev.findById(devId);// ID do dev que recebeu o like
        
        if(!targetDev){//SE O DEV QUE RECEBEU O LIKE NÃO TIVER CADASTRADO NO SISTEMA DA UM ERRO 400: ERRO NA REQUISIÇÃO
            return res.status(400).json({ error: "Dev not exist" });
        }

        loggedDev.likes.push(targetDev._id);//EU ADICIONO O ID DO DEV QUE RECEBEU O LIKE NO VETOR DE LIKES DO QUE DEU O LIKE

        await loggedDev.save();//SALVA TUDO
        
        return res.json(loggedDev);// MANDO UM JSON DO DEV LOGADO
    }
}; 