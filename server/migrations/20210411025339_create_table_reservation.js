exports.up = function (knex, Promise) {
	return knex.schema.createTable('reservations', table => {
		table.increments('id').primary()
		table.string('description', 1000).notNull()
		table.string('dayTime').notNull()
		table.string('time').defaultTo(null)
		table.integer('duration').notNull()
		table.enu('activity', ['Pesquisa', 'Extensão', 'Ensino']).notNull()
		table.integer('projectId').references('id')
			.inTable('projects').notNull()
		table.integer('userId').references('id')
			.inTable('users').notNull()
	})

};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable('reservations')

};