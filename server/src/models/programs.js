const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Programs = sequelize.define('programas', {
	nome: { allowNull: false, type: Sequelize.STRING(100), validate: { len: [3, 100] } },
	responsavel: { allowNull: false, type: Sequelize.STRING(100), validate: { len: [3, 100] } },
	ano: { allowNull: false, type: Sequelize.INTEGER }
})

module.exports = Programs