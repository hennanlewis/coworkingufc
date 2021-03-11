const Sequelize = require('sequelize')
const config = require('../config/config')

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword,
	{
		host: config.host,
		dialect: config.dialect
	}
)

const Managers = sequelize.define("gerentes", {
	nome: { allowNull: false, type: Sequelize.STRING(100), validate: { len: [3,100]} },
	email: { allowNull: false, type: Sequelize.STRING(100) },
})

module.exports = Managers