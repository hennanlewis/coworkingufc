module.exports = app => {
	const { existsOrError, notExistsOrError } = app.api.validation

	const save = async (req, res) => {
		const project = { ...req.body }
		if (req.params.id) project.id = req.params.id

		try {

			existsOrError(project.name, 'Nome não informado')
			existsOrError(project.description, 'Descrição não informada')
			existsOrError(project.programId, 'Programa não informado')
			existsOrError(project.userId, 'Membro não informado')

		} catch (msg) {
			res.status(400).send(msg)
		}

		if (project.id) {
			app.db('projects')
				.update(project)
				.where({ id: project.id })
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		} else {
			app.db('projects')
				.insert(project)
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}
	}

	const get = (req, res) => {
		app.db('projects as p')
			.join('programs as p2', 'p.programId', '=', 'p2.id')
			.join('users as u', 'p.userId', '=', 'u.id')
			.select('p.id', 'p.name', 'p.description', 'p.programId', 'p2.name as programName', 'p.userId', 'u.name as userName')
			.then(projects => res.json(projects))
			.catch(err => res.status(500).send(err))
	}

/* 	const getById = (req, res) => {
		app.db('projects')
		.select('id', 'name', 'description', 'programId', 'userId')
		.where({ id: req.params.id })
		.first()
		.then(project => res.json(project))
		.catch(err => res.status(500).send(err))
	} */

	const remove = async (req, res) => {
		try {
			existsOrError(req.params.id, 'Código do Projeto não informado.')

			const projects = await app.db('reservation')
				.where({ id: req.params.id }).del()
			notExistsOrError(projects, 'Projeto possui reservas.')

			const rowsDeleted = await app.db('projects')
				.where({ id: req.params.id }).del()
			existsOrError(rowsDeleted, 'Projeto não foi encontrado.')

			res.status(204).send()
		} catch (msg) {
			res.status(400).send(msg)
		}
	}

	return { save, get, remove }
}