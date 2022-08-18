const Sequelize = require("sequelize")
const connection = require("../database/database")


const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

/**Depois que criar a tabela é bom excluir
 * para não recriar a tabela toda hora
 * sincronizar com o banco
 */

//User.sync({force: true})

module.exports = User