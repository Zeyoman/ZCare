const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
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
      sex,
      typeOfLoveGiving,
      typeOfLoveReceiving,
    } = req.body;

    if (!firstName || !lastName || !mail || !pseudo || !password || !sex || !age) {
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
      age,
      sex,
      typeOfLoveGiving,
      typeOfLoveReceiving,
    });

    res.status(201).json({ id: user._id, mail: user.mail, pseudo: user.pseudo });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

