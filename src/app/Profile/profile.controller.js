import ProfileService from './profile.service.js';

class ProfileController {
  constructor() {
    this.profileService = new ProfileService();
  }

  updateProfile(req, res, next) {
    this.profileService.updateProfile(req, res, next);
  }
}

export default ProfileController;
