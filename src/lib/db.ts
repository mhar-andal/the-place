import knexfile from '../../knexfile'

// eslint-disable-next-line
const knex = require('knex')(knexfile.development)

export default knex
