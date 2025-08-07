// ZCare/backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User } = require('../models');

const router = express.Router();

const SALT_ROUNDS = 10;

router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mail,
      pseudo,
      password,
      age,
      sex
    } = req.body;

    const ageNumber = Number(age)

    if (!firstName || !lastName || !mail || !pseudo || !password || !sex || isNaN(ageNumber)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({
      $or: [{ mail }, { pseudo }],
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      mail,
      pseudo,
      password: hashedPassword,
      age: ageNumber,
      sex,
      roles: 'ROLE_USER',
      subscription: 'SUB_FREE',
      typeOfLoveGiving: '',
      typeOfLoveReceiving: ''
    });

    res.status(201).json({ id: user._id, mail: user.mail, pseudo: user.pseudo });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { mail, pseudo, password } = req.body;

    if (!password || (!mail && !pseudo)) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const user = await User.findOne(mail ? { mail } : { pseudo });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.token = token;
    await user.save();

    const { password: _password, __v, ...userData } = user.toObject();
    res.json(userData);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token required' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.token = null;
    await user.save();
    res.json({ message: 'Logged out' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
