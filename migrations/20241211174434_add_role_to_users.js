exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('role').defaultTo('user')
  })
}
exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('role')
  })
}
