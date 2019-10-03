const Dev = require('../models/Dev');

// Camila Tereza - 5d95f093bf55dd377883b87f 
// Marcos Ludgério - 5d9517cd3dfb171c847cf09d
// Diego3g - 5d95f0a5bf55dd377883b880


module.exports = {
    async store(req, res) {
        //console.log(req.params.devId);
        const { devId } = req.params;
        // console.log(req.headers.user);
        const { user } = req.headers;

        //TargetDev contém a instância do banco com os dados do dev que recebeu o deslike
        const targetDev = await Dev.findById(devId);

        // LoggedDev contém a instância do banco com os dados do dev que deu o deslike
        const loggedDev = await Dev.findById(user);

        // O usuário que tá recebendo o deslike não existir
        if (!targetDev) {
            return res.status(400).json({ erro: 'usuário não existe!' });
        }

        //Add o usuário que recebeu o like na listas de deslikes do dev logado
        loggedDev.deslikes.push(targetDev._id);

        //Salvando as alterações na base de dados
        await loggedDev.save();

        return res.json(loggedDev);
    }
};