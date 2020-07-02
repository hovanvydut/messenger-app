const randomAvatar = require('../../helper/randomAvatar');

const TABLE_NAME = 'users';

exports.up = (knex) => {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.string('id').primary();
    table.string('username').unique();
    table.string('email').unique();
    table.string('phone').unique();
    table.string('password');
    table.string('fullName');
    table.string('avatar').defaultTo(randomAvatar());
    table.string('website');
    table.string('city');
    table.string('description');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(TABLE_NAME);
};
