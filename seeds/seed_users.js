/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').insert([
    { email: 'john.doe@example.com', id: 1, name: 'John Doe' },
    { email: 'jane.doe@example.com', id: 2, name: 'Jane Doe' },
    { email: 'jim.doe@example.com', id: 3, name: 'Jim Doe' },
  ])
}
