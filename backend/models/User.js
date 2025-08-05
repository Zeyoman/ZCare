const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:            { type: String, required: true },
  lastName:             { type: String, required: true },
  mail:                 { type: String, required: true, unique: true },
  pseudo:               { type: String, required: true, unique: true },
  age:                  { type: Number, required: true },
  sex:                  { type: String, required: true, enum: ['HOMME', 'FEMME', 'AUTRE'] },
  roles:                { type: String, default: 'ROLE_USER', enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MODERATOR'] },
  subscription:         { type: String, default: 'SUB_FREE', enum: ['SUB_FREE', 'SUB_PREMIUM'] },
  typeOfLoveGiving:     { type: String },
  typeOfLoveReceiving:  { type: String },
  password:             { type: String, required: true },
  token:                { type: String }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });

module.exports = mongoose.model('User', userSchema);
