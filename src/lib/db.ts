// eslint-disable-next-line
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite3',
    flags: ['OPEN_URI', 'OPEN_SHAREDCACHE'],
  },
  seeds: {
    directory: '../../../seeds',
  },
  useNullAsDefault: true,
})

export default knex
