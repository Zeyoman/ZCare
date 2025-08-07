// ZCare/backend/routes/users.js
const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        };
        res.json(user);
    } catch (err) {
        console.error('[USERS GET]', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;