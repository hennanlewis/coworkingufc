exports.up = function(knex, Promise) {
    return knex.schema.createTable('reservation', table =>{
        table.increments('id').primary()        
        table.string('description', 1000).notNull()      
        table.integer('projectId').references('id')
            .inTable('projects').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('duration').notNull()
        table.enu('activity', ['Pesquisa', 'Extensão', 'Ensino'] ).notNull()
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reservation')
  
};

