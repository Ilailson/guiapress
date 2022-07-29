const Sequelize = require('sequelize')
const connection = require('./database')

const resposta = connection.define('respostas', {
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//sicronizar com banco
//force não vai forçar a criação caso a tabela já exista
resposta.sync({force: false}).then(() => {
    console.log("Tabela criada")
}).catch((err) => {
    console.log("Não foi possível criar a tabela")
    console.log(err)
})


module.exports = resposta