
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', table =>{
        table.string('curso')
        .defaultTo(null)
     })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('curso')
    })  
  
};
