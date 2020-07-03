import ProfileRepository from './profile.repository.js';

class ProfileService {
  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  updateProfile(req, res, next) {
    this.profileRepository.updateProfile(req, res, next);
  }
}

export default ProfileService;
