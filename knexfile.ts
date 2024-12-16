const config = {
  development: {
    client: 'pg',
    connection: {
      database: 'myapp_db',
      host: 'localhost',
      password: 'postgres',
      port: 5434,
      user: 'postgres',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
}

export default config
