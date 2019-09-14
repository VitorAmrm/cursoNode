const { Schema, model} = require('mongoose');

const DevSchema = new Schema({ //tabela no banco de dados
    nome: {
        type = String,
        required = true //campo obrigatório
    },
    user: {
        type = String,
        required = true //campo obrigatório
    },
    bio: String,
    avatar: {
        type = String,
        required = true //campo obrigatório
    },
}, {
    timestamps: true,
});

//expotar a tabela
module.exports('Dev', DevSchema)