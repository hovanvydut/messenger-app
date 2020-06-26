const knex = require('../../database/knex.connection');
const relationEnum = require('./relationship.constant');

class FriendRepository {
  findByEmail(email) {
    return knex('users').select('*').where({ email }).first();
  }

  async insertRow(idSender, idReceiver) {
    try {
      await Promise.all([
        knex('friends').insert({
          user1: idSender,
          user2: idReceiver,
          relationship: relationEnum.USER1_SEND_REQUEST_USER2,
        }),
        knex('friends').insert({
          user1: idReceiver,
          user2: idSender,
          relationship: relationEnum.USER1_RECEIVE_USER2,
        }),
      ]);
    } catch (error) {
      console.log('Duplicate unique row (user1, user2)');
    }
  }

  findByIdAndRelationship(userId, relationship) {
    return knex('friends')
      .select()
      .where({ user1: userId, relationship })
      .innerJoin('users', 'users.id', '=', 'friends.user2');
  }

  changeRelationship(user1, user2, relationship) {
    return knex('friends')
      .where({ user1, user2 })
      .update({ relationship }, ['user1', 'user2']);
  }
}

module.exports = FriendRepository;
