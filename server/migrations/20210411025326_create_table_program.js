
exports.up = function(knex, Promise) {
    return knex.schema.createTable('programs', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('responsible').notNull()
        table.integer('year').notNull()        
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('programs')
  
};
