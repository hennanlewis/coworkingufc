module.exports = app => {
	const { existsOrError } = app.api.validation

	const save = async (req, res) => {
		const reservation = { ...req.body }
		if (req.params.id) reservation.id = req.params.id

		try {

			existsOrError(reservation.description, 'Objetivo da reserva não informado')
			existsOrError(reservation.dateTime, 'Horário de início não informado')
			existsOrError(reservation.duration, 'Tempo de reserva não informado')
			existsOrError(reservation.activity, 'Atividade não informada')
			existsOrError(reservation.projectId, 'Projeto não informado')
			existsOrError(reservation.userId, 'Participante(s) não informado(s)')

		} catch (msg) {
			res.status(400).send(msg)
		}

		if (reservation.id) {
			app.db('reservation')
				.update(reservation)
				.where({ id: reservation.id })
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		} else {
			app.db('reservation')
				.insert(reservation)
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}
	}

	const get = (req, res) => {
		app.db('reservation as r')
			.join('projects as p', 'p.id', '=', 'r.projectId')
			.join('users as u', 'u.id', '=', 'r.userId')
			.select('r.id', 'r.description', 'r.dateTime', 'r.duration', 'r.activity', 'r.projectId', 'p.name as projectName', 'r.userId', 'u.name as userName')
			.then(reservation => res.json(reservation))
			.catch(err => res.status(500).send(err))
	}

	const getById = (req, res) => {
		app.db('reservation')
		.select('id', 'description', 'dateTime', 'duration', 'activity', 'projectId', 'userId')
		.where({ id: req.params.id })
		.first()
		.then(reservation => res.json(reservation))
		.catch(err => res.status(500).send(err))
	}

	const remove = async (req, res) => {
		try {
			existsOrError(req.params.id, 'Código da Reserva não informado.')

			const rowsDeleted = await app.db('reservation')
				.where({ id: req.params.id }).del()
			existsOrError(rowsDeleted, 'Reserva não foi encontrada.')

			res.status(204).send()
		} catch (msg) {
			res.status(400).send(msg)
		}
	}

	return { save, get, getById, remove }
}