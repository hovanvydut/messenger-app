const ProfileRepository = require('./profile.repository');

class ProfileService {
  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  updateProfile(req, res, next) {
    this.profileRepository.updateProfile(req, res, next);
  }
}

module.exports = ProfileService;
