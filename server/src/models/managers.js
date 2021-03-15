const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Managers = sequelize.define("gerentes", {
	nome: { allowNull: false, type: Sequelize.STRING(100), validate: { len: [3,100]} },
	email: { allowNull: false, type: Sequelize.STRING(100) },
})

module.exports = Managers