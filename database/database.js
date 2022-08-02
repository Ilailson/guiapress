const Sequelize = require('sequelize');

//construindo a conexão
//corrigindo timezone
const connection = new Sequelize(
    'guiapress','root','',
    { 
        host: 'localhost',
        dialect: 'mysql',
        timezone: "-03:00"
    }
)

//exportando a conexão para acessar de qualquer lugar do projeto
module.exports = connection;