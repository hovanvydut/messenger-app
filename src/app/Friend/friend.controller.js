const FriendService = require('./friend.service');

class FriendController {
  static instance;

  constructor() {
    this.friendService = FriendService.getInstance();
  }

  static getInstance() {
    return this.instance ? this.instance : new this();
  }

  async sendFriendRequest(req, res) {
    const { authUser } = req;
    const { emailReceiver, messageAddFriend } = req.body;
    try {
      await this.friendService.sendFriendRequest(
        authUser,
        emailReceiver,
        messageAddFriend
      );
      return res.status(200).json({ emailReceiver });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteFriendRequest(req, res) {
    const friendRequestId = req.params.id;
    const currentUserId = req.authUser.user_id;
    try {
      await this.friendService.deleteFriendRequest(
        friendRequestId,
        currentUserId
      );
      return res
        .status(200)
        .json({ message: 'Delete friend request successfully' });
    } catch (error) {
      return res.status(400).json({ message: 'Error when delete' });
    }
  }

  async getAllRequestFriends(req, res) {
    const { authUser } = req;
    const receiverId = authUser.user_id;

    const listFriends = await this.friendService.getAllFriendRequestTo(
      receiverId
    );

    return res.json(listFriends);
  }

  async allFriends(req, res) {
    const { authUser } = req;
    const userId = authUser.user_id;

    const listFriends = await this.friendService.getAllFriends(userId);

    return res.status(200).json(listFriends);
  }

  async acceptFriendRequest(req, res) {
    const { authUser } = req;
    const { senderId } = req.body;
    const receiverId = authUser.user_id;

    try {
      const acceptedSenderId = await this.friendService.acceptFriendRequest(
        receiverId,
        senderId
      );
      return res.status(200).json(acceptedSenderId);
    } catch (error) {
      return res.status(400).send('NOT ACCEPT');
    }
  }

  async deleteFriend(req, res) {
    const { authUser } = req;
    const { deletingUserId } = req.params;
    try {
      await this.friendService.deleteFriend(authUser.user_id, deletingUserId);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Error when query database' });
    }

    return res.status(200).json({ message: 'Delete user friend success' });
  }
}

module.exports = FriendController;
