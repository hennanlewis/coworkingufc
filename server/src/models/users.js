const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Users = sequelize.define("usuarios", {
	nome: { allowNull: false, type: Sequelize.STRING(45), validate: { len: [3,45]} },
	email: { allowNull: false, type: Sequelize.STRING(45) },
	curso: { allowNull: false, type: Sequelize.STRING(45) },
})

module.exports = Users