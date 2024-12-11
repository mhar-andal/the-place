const bcrypt = require('bcrypt')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const hashedPassword = await bcrypt.hash('your-password', 10)
  await knex('users').insert([
    {
      email: 'mharandal96@gmail.com',
      id: 1,
      name: 'John Doe',
      password: hashedPassword,
    },
  ])
}
