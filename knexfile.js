module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'clucks'
    },
        migrations: {
          tableName: 'knex_migrations',
          directory: "./db/migrations"
        
  },
    seeds: {
      directory: "./db/seeds"
    }
  }}


