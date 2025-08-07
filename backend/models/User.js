// ZCare/backend/models/User.js
const mongoose = require('mongoose');

const humorEntrySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  note: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  firstName:            { type: String, required: true },
  lastName:             { type: String, required: true },
  mail:                 { type: String, required: true, unique: true },
  pseudo:               { type: String, required: true, unique: true },
  age:                  { type: Number, required: true },
  phone:                { type: Number, required: true },
  sex:                  { type: String, required: true, enum: ['HOMME', 'FEMME', 'AUTRE'] },
  roles:                { type: String, default: 'ROLE_USER', enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MODERATOR'] },
  subscription:         { type: String, default: 'SUB_FREE', enum: ['SUB_FREE', 'SUB_PREMIUM'] },
  typeOfLoveGiving:     { type: String },
  typeOfLoveReceiving:  { type: String },
  password:             { type: String, required: true },
  token:                { type: String },
  remember:             { type: Boolean, default: false },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  emergencyContacts: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    validate: {
      validator: contacts => Array.isArray(contacts) && contacts.length <= 3,
      message: 'Emergency contacts cannot exceed 3'
    },
    default: []
  },
  humors: {
    type: [humorEntrySchema],
    default: []
  }
}, { timestamps: { 
    createdAt: 'creationDate', 
    updatedAt: 'updateDate'
  } 
});

userSchema.pre('save', function(next) {
  if (this.isModified('humors')) {
    this.humors = this.humors.map((entry, index) => ({
      ...entry,
      id: index + 1
    }));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
