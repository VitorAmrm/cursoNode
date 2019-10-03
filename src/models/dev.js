const { Schema, model } = require('mongoose');

const DevSchema = new Schema({ //tabela no banco de dados
    nome: {
        type: String,
        required: true //campo obrigatório
    },
    user: {
        type: String,
        required: true //campo obrigatório
    },
    bio: String,
    avatar: {
        type: String,
        required: true //campo obrigatório
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    deslikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    timestamps: true,
});

//expotar a tabela
module.exports = model('Dev', DevSchema);