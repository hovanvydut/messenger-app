const knex = require('../../database/knex.connection');

class ProfileRepository {
  async updateProfile(req, res, next) {
    const { authUser } = req;
    const profile = req.body;
    const condition = {};
    condition.id = authUser.user_id;
    if (authUser.phone_number) condition.phone = authUser.phone_number;
    if (authUser.email) condition.email = authUser.email;
    const data = Object.assign(condition, profile);
    // knex.raw();
    console.log('end');
  }
}

module.exports = ProfileRepository;
