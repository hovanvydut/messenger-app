const firebase = require('../../../database/firebase.connection');
const firebaseAdmin = require('../../../database/firebaseAdmin.connection');
const knex = require('../../../database/knex.connection');

const handleRegisterByEmail = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const currentUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(403).json(errorMessage);
    });

  await knex('users').insert({
    first_name: firstName,
    last_name: lastName,
    email: currentUser.user.email,
  });
  return res.json(req.body);
};

const handleLoginByEmail = async (req, res) => {
  const { email, password } = req.body;

  const currentUser = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        return res.status(400).json({ message: 'Wrong password' });
      }
      return res.status(400).json({ message: errorMessage });
    });

  return res.status(200).json(currentUser.user);
};

module.exports = {
  handleRegisterByEmail,
  handleLoginByEmail,
};
