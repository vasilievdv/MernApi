const bcrypt = require('bcryptjs');
const User = require('../../db/models/User');
const { registerValidation } = require('../validation/validation');

const signUp = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const {
    username, password, email, birthdate, sex,
  } = data;
  const { error } = registerValidation(data);

  if (!req.files) {
    return res.status(400).json({ message: 'Photo required' });
  }

  if (!error) {
    const { file } = req.files;
    const { name } = req.files.file;
    const photo = `${new Date().toISOString()}-${name}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      birthdate,
      sex,
      photo,
    });

    try {
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
      }
      // req.session.user = {
      //   id: user.id,
      //   name: user.username,
      // };
      file.mv(`./uploads/${photo}`);
      await user.save();
      return res.json({ message: 'Пользователь успешно зарегистрирован', name: user.username });
    } catch (err) {
      return res.sendStatus(500);
    }
  }
  return res.status(400).send(error.details[0]);
};

const signIn = async (req, res) => {
  const { password, username } = req.body;
  if (password && username) {
    try {
      const currentUser = await User.findOne({ username });
      const validPass = await bcrypt.compare(password, currentUser.password);
      if (currentUser && validPass) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.username,
        };
        return res.json({ id: currentUser.id, name: currentUser.username });
      }
      return res.sendStatus(401);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
};

const signOut = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    res.clearCookie(req.app.get('cookieName'));

    return res.sendStatus(200);
  });
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    return res.json({ id: user.id, name: user.username });
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
};
