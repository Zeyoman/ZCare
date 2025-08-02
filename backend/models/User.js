const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  pseudo: { type: String, required: true, unique: true },
  age: { type: Number },
  sex: { type: String },
  typeOfLoveGiving: { type: String },
  typeOfLoveReceiving: { type: String },
  token: { type: String }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });

module.exports = mongoose.model('User', userSchema);
