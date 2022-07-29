const Sequelize = require("sequelize")
const connection = require("../database/database")
//importando a categoria para realizar o relacionamento
const Category = require("../categories/Category") 

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) //categoria tem muitos artigos - 1 para muitos 
Article.belongsTo(Category) // um artigo pertencente - categoria -  1 para  1

/**Depois que criar a tabela é bom excluir
 * para não recriar a tabela toda hora
 * sincronizar com o banco
 */
//Article.sync({force: true})

module.exports = Article