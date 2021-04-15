module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const program = { ...req.body }
        if(req.params.id) program.id = req.params.id

        try {

			existsOrError(program.name, 'Nome não informado')
            existsOrError(program.responsible, 'Responsável não informado')
            existsOrError(program.year, 'Ano não informado')

		} catch(msg) {
            res.status(400).send(msg)
        }

        if(program.id) {
            app.db('programs')
            .update(program)
            .where({ id: program.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        } else {
            app.db('programs')
            .insert(program)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }        
    }

    const get = (req, res) => {
        app.db('programs')
        .select('id', 'name', 'responsible', 'year')
        .then(programs => res.json(programs))
        .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('programs')
        .select('id', 'name', 'responsible', 'year')
        .where({ id: req.params.id })
        .first()
        .then(program => res.json(program))
        .catch(err => res.status(500).send(err))

    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do Programa não informado.')

			const projects = await app.db('projects')
                .where({ id: req.params.id }).del()
            	notExistsOrError(projects, 'Programa possui projetos.')

			const rowsDeleted = await app.db('programs')
                .where({ id: req.params.id }).del()
            	existsOrError(rowsDeleted, 'Programa não foi encontrado.')

			res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }
   
    return { save, get, getById, remove }
}