exports.up = (knex) => {
  return knex.schema.alterTable('friends', (t) => {
    t.unique(['user1', 'user2']);
  });
};

exports.down = (knex) => {};
