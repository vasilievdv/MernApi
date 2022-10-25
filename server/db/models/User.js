const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true },
  sex: { type: String, required: true },
  photo: { type: String, required: true },
});

module.exports = mongoose.model('Users', userSchema);
