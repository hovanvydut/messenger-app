export default {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:123456@127.0.0.1:5432/messenger_app',
    migrations: {
      directory: `${process.cwd()}/src/database/migrations`,
    },
  },
};
