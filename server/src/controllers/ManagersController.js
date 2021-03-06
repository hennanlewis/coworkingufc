const Managers = require('../models/managers')
const status = require('http-status')

exports.Insert = (req, res, next) => {

	const nome = req.body.nome
	const email = req.body.email

	Managers.create({
		nome: nome,
		email: email
	})
	.then(data => {
		if(data) {
			res.status(status.OK).send(data)
		} else {
			res.status(status.NOT_FOUND).send()
		}
	})
	.catch(error => next(error))

}

exports.SearchAll = (req, res, next) => {
	Managers.findAll()
	.then(data => {
		if(data) res.status(status.OK).send(data)
	})
	.catch(error => next(error))
}

exports.SearchOne = (req, res, next) => {
	const id = req.params.id

	Managers.findByPk(id)
	.then(data => {
		if(data) {
			res.status(status.OK).send(data)
		} else {
			res.status(status.NOT_FOUND).send()
		}
	})
	.catch(error => next(error))
}

exports.Update = (req, res, next) => {

	const id = req.params.id
	const nome = req.body.nome
	const email = req.body.email

	Managers.findByPk(id)
	.then(data => {
		if(data) {
			data.update({
				nome: nome,
				email: email
			},
			{
				where: { id: id }
			})
			.then(() => {
				res.status(status.OK).send()
			})
			.catch(error => next(error))
		} else {
			res.status(status.NOT_FOUND).send()
		}
	})
	.catch(error => next(error))

}

exports.Delete = (req, res, next) => {
	const id = req.params.id

	Managers.findByPk(id)
	.then(data => {
		if(data) {
			data.destroy({
				where: { id: id }
			})
			.then(() => {
				res.status(status.OK).send()
			})
			.catch(error => next(error))
		} else {
			res.status(status.NOT_FOUND).send()
		}
	})
	.catch(error => next(error))
}