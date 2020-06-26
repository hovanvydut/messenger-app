const FriendRepository = require('./friend.repository');
const relationEnum = require('./relationship.constant');

class FriendService {
  constructor() {
    this.friendRepository = new FriendRepository();
  }

  async addFriendRequest(authUser, emailReceiver) {
    const receiver = await this.friendRepository.findByEmail(emailReceiver);

    if (receiver.id === authUser.user_id)
      throw new Error('Dont allow send request to yourself');

    if (!receiver) throw new Error('User is not exist');

    this.friendRepository.insertRow(authUser.user_id, receiver.id);
  }

  async acceptFriendRequest(receiverId, senderId) {
    const returningData1 = await this.friendRepository.changeRelationship(
      receiverId,
      senderId,
      relationEnum.ACCEPTED
    );
    const returningData2 = await this.friendRepository.changeRelationship(
      senderId,
      receiverId,
      relationEnum.ACCEPTED
    );
    return [...returningData1, ...returningData2];
  }

  async getAllRequestFriends(receiverId) {
    const listRequestFriends = await this.friendRepository.findByIdAndRelationship(
      receiverId,
      relationEnum.USER1_RECEIVE_USER2
    );

    console.log(listRequestFriends);

    return listRequestFriends.map((user) => {
      return {
        id: user.user2,
        username: user.username,
        fullName: user.fullName,
      };
    });
  }

  getAllFriends(userId) {
    return this.friendRepository.findByIdAndRelationship(
      userId,
      relationEnum.ACCEPTED
    );
  }
}

module.exports = FriendService;
