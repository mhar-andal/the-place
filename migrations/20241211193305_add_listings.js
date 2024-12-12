exports.up = function (knex) {
  return knex.schema.createTable('listings', (table) => {
    table.increments('id')
    table.string('title')
    table.string('description')
    table.string('image')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('listings')
}
