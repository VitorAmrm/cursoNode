const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        // console.log(req.headers.user);
        const { user } = req.headers;

        //TargetDev contém a instância do banco com os dados do dev que recebeu o like
        const targetDev = await Dev.findById(devId);

        //LoggedDev contém a instância do banco com os dados do dev que deu o like
        const loggedDev = await Dev.findById(user);

        // O usuário que tá recebendo o like não existir
        if (!targetDev) {
            return res.status(400).json({ erro: 'usuário não existe!' });
        }

        //Se houver troca troca de likes
        if(targetDev.likes.includes(loggedDev._id)){
            console.log("Ui, papai. Hoje tem!");          
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }
        //Add o usuário que recebeu o like na listas de likes do dev logado
        loggedDev.likes.push(targetDev._id);

        //Salvando as alterações na base de dados
        await loggedDev.save();

        return res.json(loggedDev);
    }
};