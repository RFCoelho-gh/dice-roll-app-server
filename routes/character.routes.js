const router = require('express').Router();
const Character = require('../models/Character.model');

//! SAVE CHARACTER

router.post('/save-character', async(req, res, next) => {

    try {

        const {firstName, lastName, gender, level, ancestry,
        background, charClass, deity} = req.body;

        const newCharacter = await Character.create({
            firstName, lastName, gender, 
            level, ancestry, background, 
            charClass, deity
        });
        
    } catch (err) {
        res.json(err);
        next(err);
        
    };
});