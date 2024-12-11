module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3',
      flags: ['OPEN_URI', 'OPEN_SHAREDCACHE'],
    },
    useNullAsDefault: true,
  },
}
