const Sequelize = require("sequelize")
const connection = require("../database/database")


const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

/**Depois que criar a tabela é bom excluir
 * para não recriar a tabela toda hora
 * sincronizar com o banco
 */

//Category.sync({force: true})

module.exports = Category