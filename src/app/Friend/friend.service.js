const FriendRepository = require('./friend.repository');
const relationEnum = require('./relationship.constant');

class FriendService {
  static instance;

  constructor() {
    this.friendRepository = FriendRepository.getInstance();
  }

  static getInstance() {
    return this.instance ? this.instance : new this();
  }

  async sendFriendRequest(authUser, emailReceiver, messageAddFriend) {
    const receiver = await this.friendRepository.findByEmail(emailReceiver);

    if (!receiver) throw new Error('User is not exist');

    if (receiver.id === authUser.user_id)
      throw new Error('Oop! This is your email address');

    // truoc do a --> b, sau do b lai gui ket ban toi a
    const listFriendRequests = await this.getAllFriendRequestTo(
      authUser.user_id
    );
    if (listFriendRequests.some((request) => receiver.id === request.id)) {
      try {
        await this.acceptFriendRequest(receiver.id, authUser.user_id);
      } catch (error) {
        throw error;
      }
    }

    // b truoc do da gui ket ban cho a, bay gio b tiep tuc gui lai ket ban cho a
    try {
      const data = await this.getAllFriendRequestFrom(authUser.user_id);
      if (data.length > 0) {
        throw new Error(
          `You have sent this friend request to ${receiver.email}`
        );
      }
    } catch (error) {
      throw error;
    }
    this.friendRepository.insertRow(
      authUser.user_id,
      receiver.id,
      messageAddFriend
    );
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

  async deleteFriendRequest(friendRequestId, currentUserId) {
    try {
      const data = await Promise.all([
        this.friendRepository.deleteByIdAndRelationship(
          currentUserId,
          friendRequestId,
          relationEnum.USER1_RECEIVE_USER2
        ),
        this.friendRepository.deleteByIdAndRelationship(
          friendRequestId,
          currentUserId,
          relationEnum.USER1_SEND_REQUEST_USER2
        ),
      ]);
      console.log(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllFriendRequestTo(receiverId) {
    const listFriendRequests = await this.friendRepository.findByIdAndRelationship(
      receiverId,
      relationEnum.USER1_RECEIVE_USER2
    );

    return listFriendRequests.map((user) => {
      return {
        id: user.user2,
        username: user.username,
        fullName: user.fullName,
        avatar: user.avatar,
        messageAddFriend: user.messageAddFriend,
      };
    });
  }

  getAllFriendRequestFrom(senderId) {
    return this.friendRepository.findByIdAndRelationship(
      senderId,
      relationEnum.USER1_SEND_REQUEST_USER2
    );
  }

  getAllFriends(userId) {
    return this.friendRepository.findByIdAndRelationship(
      userId,
      relationEnum.ACCEPTED
    );
  }

  deleteFriend(currentUserId, deletingUserId) {
    return Promise.all([
      this.friendRepository.deleteByIdAndRelationship(
        currentUserId,
        deletingUserId,
        relationEnum.ACCEPTED
      ),
      this.friendRepository.deleteByIdAndRelationship(
        deletingUserId,
        currentUserId,
        relationEnum.ACCEPTED
      ),
    ]);
  }
}

module.exports = FriendService;
