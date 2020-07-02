const router = require('express').Router();
const FriendController = require('./friend.controller');
const AuthMiddleware = require('../Auth/auth.middleware');

const authMiddleware = new AuthMiddleware();
const friendController = FriendController.getInstance();

router
  .use(authMiddleware.validateToken)
  // GET  user/friends/requests
  // PUT/PATCH friends/accept
  // POST friends/request

  // list all request-friends
  .get(
    '/requests',
    friendController.getAllRequestFriends.bind(friendController)
  )
  .delete(
    '/:id/request',
    friendController.deleteFriendRequest.bind(friendController)
  )
  .get('/all', friendController.allFriends.bind(friendController))
  // accept request-friend
  .patch('/accept', friendController.acceptFriendRequest.bind(friendController))
  .delete(
    '/:deletingUserId/delete',
    friendController.deleteFriend.bind(friendController)
  )
  // send request-friend
  .post('/request', friendController.sendFriendRequest.bind(friendController));

module.exports = router;
