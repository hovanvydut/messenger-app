const ProfileService = require('./profile.service');

class ProfileController {
  constructor() {
    this.profileService = new ProfileService();
  }

  updateProfile(req, res, next) {
    this.profileService.updateProfile(req, res, next);
  }
}

module.exports = ProfileController;
