import knexfile from '../../knexfile'

// eslint-disable-next-line
const knex = require('knex')(
  process.env.NODE_ENV === 'development'
    ? knexfile.development
    : knexfile.production,
)

export default knex
