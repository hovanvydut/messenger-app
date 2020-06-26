const router = require('express').Router();
const FriendController = require('./friend.controller');
const AuthMiddleware = require('../Auth/auth.middleware');

const authMiddleware = new AuthMiddleware();
const friendController = new FriendController();

router

  // GET  user/friends/requests
  // PUT/PATCH friends/accept
  // POST friends/request

  // list all request-friends
  .get(
    '/requests',
    authMiddleware.validateToken,
    friendController.getAllRequestFriends.bind(friendController)
  )
  .get(
    '/all',
    authMiddleware.validateToken,
    friendController.allFriends.bind(friendController)
  )
  // accept request-friend
  .post(
    '/accept',
    authMiddleware.validateToken,
    friendController.acceptFriendRequest.bind(friendController)
  )
  // send request-friend
  .post(
    '/request',
    authMiddleware.validateToken,
    friendController.addFriendRequest.bind(friendController)
  );

module.exports = router;
