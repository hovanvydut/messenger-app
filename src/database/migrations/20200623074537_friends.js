const TABLE_NAME = 'friends';
const TABLE_NAME_2 = 'users';

exports.up = (knex) => {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table
      .string('user1')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME_2)
      .onDelete('CASCADE');
    table
      .string('user2')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME_2)
      .onDelete('CASCADE');
    table.integer('relationship').notNullable();
    table.timestamp('last_updated').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
