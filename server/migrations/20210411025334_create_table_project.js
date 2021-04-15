exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()       
        table.integer('programId').references('id')
            .inTable('programs').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('projects')
  
};