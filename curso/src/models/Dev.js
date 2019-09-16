//IMPORTANDO DO BANCO DE DADOS O SCHEMA(NO RELACIONAL EQUIVALE AS TABELAS) E O MODEL, SERÁ UTIL NO FINAL
const { Schema, model } = require('mongoose')

//DEVSCHEMA É A TABLEA DO BANCO QUE  IRÁ CADASTRAR OS DEVS COM TODOS OS ATRIBUTOS
const DevSchema = new Schema({
    nome: {
        type: String,//TIPO
        required: true, // OBRIGATÓRIO
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId, //CHAVE ESTRANGEIRA QUE REFERENCIA A TABELA DEVS
        ref: 'Dev',
     }],
    deslikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    timestamps: true,//CRIA DUAS COLUNAS: CREATEAT E UPDATEAT SALVA AUTOMATICAMENTE A DATA QUE FOI CRIADO E ATUALIZADO PELA ULTIMA VEZ
}
);

module.exports = model('Dev', DevSchema); //EXPORTA A TABELA E A REFERÊNCIA

