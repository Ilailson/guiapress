const Sequelize = require('sequelize');

//construindo a conexão
const connection = new Sequelize(
    'guiapress','root','',
    { 
        host: 'localhost',
        dialect: 'mysql'
    }
)

//exportando a conexão para acessar de qualquer lugar do projeto
module.exports = connection;