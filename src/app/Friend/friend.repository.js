import knex from '../../database/knex.connection.js';
import relationEnum from './relationship.constant.js';

class FriendRepository {
  static instance;

  constructor() {}

  static getInstance() {
    return this.instance ? this.instance : new this();
  }

  findByIdAndRelationship(id, relationship) {
    return knex('friends').select().where({ id, relationship });
  }

  findByEmail(email) {
    return knex('users').select('*').where({ email }).first();
  }

  async insertRow(idSender, idReceiver, messageAddFriend) {
    try {
      await Promise.all([
        knex('friends').insert({
          user1: idSender,
          user2: idReceiver,
          relationship: relationEnum.USER1_SEND_REQUEST_USER2,
          messageAddFriend,
        }),
        knex('friends').insert({
          user1: idReceiver,
          user2: idSender,
          relationship: relationEnum.USER1_RECEIVE_USER2,
          messageAddFriend,
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

  deleteByIdAndRelationship(user1Id, user2Id, relationship) {
    let condition = { user1: user1Id };
    if (user2Id) {
      condition.user2 = user2Id;
    }
    condition.relationship = relationship;
    return knex('friends').where(condition).del().returning();
  }
}

export default FriendRepository;
