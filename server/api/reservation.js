module.exports = app => {
	const { existsOrError } = app.api.validation

	const save = async (req, res) => {
		const reservations = { ...req.body }
		if (req.params.id) reservations.id = req.params.id

		try {

			existsOrError(reservations.description, 'Objetivo da reserva não informado')
			existsOrError(reservations.dateTime, 'Horário de início não informado')
			existsOrError(reservations.duration, 'Tempo de reserva não informado')
			existsOrError(reservations.activity, 'Atividade não informada')
			existsOrError(reservations.projectId, 'Projeto não informado')
			existsOrError(reservations.userId, 'Participante(s) não informado(s)')

		} catch (msg) {
			res.status(400).send(msg)
		}

		if (reservations.id) {
			app.db('reservations')
				.update(reservations)
				.where({ id: reservations.id })
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		} else {
			app.db('reservations')
				.insert(reservations)
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}
	}

	const get = (req, res) => {
		app.db('reservations as r')
			.join('projects as p', 'p.id', '=', 'r.projectId')
			.join('users as u', 'u.id', '=', 'r.userId')
			.select('r.id', 'r.description', 'r.dateTime', 'r.duration', 'r.activity', 'r.projectId', 'p.name as projectName', 'r.userId', 'u.name as userName')
			.then(reservations => res.json(reservations))
			.catch(err => res.status(500).send(err))
	}

	const getById = (req, res) => {
		app.db('reservations')
		.select('id', 'description', 'dateTime', 'duration', 'activity', 'projectId', 'userId')
		.where({ id: req.params.id })
		.first()
		.then(reservations => res.json(reservations))
		.catch(err => res.status(500).send(err))
	}

	const remove = async (req, res) => {
		try {
			existsOrError(req.params.id, 'Código da Reserva não informado.')

			const rowsDeleted = await app.db('reservations')
				.where({ id: req.params.id }).del()
			existsOrError(rowsDeleted, 'Reserva não foi encontrada.')

			res.status(204).send()
		} catch (msg) {
			res.status(400).send(msg)
		}
	}

	return { save, get, getById, remove }
}