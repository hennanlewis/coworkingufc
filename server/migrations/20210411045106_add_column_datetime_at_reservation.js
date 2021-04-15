
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('reservation', table =>{
        table.string('dateTime')
        .defaultTo(null)
     })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('reservation', table => {
        table.dropColumn('dateTime')
    })  
  
};