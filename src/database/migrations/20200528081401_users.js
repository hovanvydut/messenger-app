const TABLE_NAME = 'users';

exports.up = (knex) => {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('email', 255).notNullable();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
