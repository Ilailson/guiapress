//conexão com banco
const Sequelize = require('sequelize')
const connection = require('./database')

const pergunta  = connection.define
(
    'perguntas',{ 
        titulo: 
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        descricao:{
            type: Sequelize.TEXT,
            allowNull: false
        }
    }
)

//sicronizar com o banco
pergunta.sync({force: false})
        .then(() => 
            {
                console.log("Tabela criada")
            }
        )
        .catch((err) =>
            {
                console.log("Não foi possivel carregar a tabela")
                console.log(err)
            }
        )

module.exports = pergunta