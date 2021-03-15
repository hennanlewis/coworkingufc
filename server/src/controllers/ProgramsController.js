const Programs = require('../models/programs')
const status = require('http-status')

exports.Insert = (req, res, next) => {

	const nome = req.body.nome
	const responsavel = req.body.responsavel
	const ano = req.body.ano

	Programs.create({
		nome: nome,
		responsavel: responsavel,
		ano: ano
	}).then(data => {
		if(data) res.status(status.OK).send(data)
		else res.status(status.NOT_FOUND).send()
	}).catch(error => next(error))

}

exports.SearchAll = (req, res, next) => {

	Programs.findAll()
		.then(data => {
			if(data) res.status(status.OK).send(data)
		}).catch(error => next(error))

}

exports.SearchOne = (req, res, next) => {

	const id = req.params.id
	Programs.findByPk(id)
		.then(data => {
			if(data) res.status(status.OK).send(data)
			else res.status(status.NOT_FOUND).send()
		}).catch(error => next(error))

}

exports.Update = (req, res, next) => {

	const id = req.params.id
	const nome = req.body.nome
	const responsavel = req.body.responsavel
	const ano = req.body.ano

	Programs.findByPk(id)
		.then(data => {
			if(data) {
				data.update({
					nome: nome,
					responsavel: responsavel,
					ano: ano
				},
				{
					where: { id: id }
				}).then(() => {
					res.status(status.OK).send()
				}).catch(error => next(error))
			} else 
				res.status(status.NOT_FOUND).send()
		}).catch(error => next(error))

}

exports.Delete = (req, res, next) => {

	const id = req.params.id

	Programs.findByPk(id)
		.then(data => {
			if(data) {
				data.destroy({
					where: { id: id }
				}).then(() => {
					res.status(status.OK).send()
				}).catch(error => next(error))
			} else {
				res.status(status.NOT_FOUND).send()
			}
		}).catch(error => next(error))

}

