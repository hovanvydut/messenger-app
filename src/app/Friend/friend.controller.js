const FriendService = require('./friend.service');

class FriendController {
  static instance;

  constructor() {
    this.friendService = new FriendService();
  }

  getInstance() {
    return this.instance ? this.instance : new this();
  }

  async addFriendRequest(req, res) {
    const { authUser } = req;
    const { emailReceiver } = req.body;
    try {
      await this.friendService.addFriendRequest(authUser, emailReceiver);
      return res.status(200).json({ emailReceiver });
    } catch (error) {
      return res.status(400).send('Failed');
    }
  }

  async getAllRequestFriends(req, res) {
    const { authUser } = req;
    const receiverId = authUser.user_id;

    const listFriends = await this.friendService.getAllRequestFriends(
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
    const senderId = req.body.senderId;
    const receiverId = authUser.user_id;

    try {
      const acceptedSenderId = await this.friendService.acceptFriendRequest(
        receiverId,
        senderId
      );
      console.log(acceptedSenderId);
      return res.status(200).json(acceptedSenderId);
    } catch (error) {
      return res.status(400).send('NOT ACCEPT');
    }
  }
}

module.exports = FriendController;
