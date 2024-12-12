require('dotenv').config()
const bcrypt = require('bcrypt')

exports.seed = async function (knex) {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
  await knex('users').insert([
    {
      email: 'johndoe@gmail.com',
      id: 1,
      name: 'John Doe',
      password: hashedPassword,
    },
  ])
}
