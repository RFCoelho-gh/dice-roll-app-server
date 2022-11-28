const router = require('express').Router();
const Character = require('../models/Character.model');
const User = require('../models/User.model');

//! SAVE CHARACTER (POST route)

router.post('/save-character', async (req, res, next) => {

    try {

        const {firstName, lastName, gender, level, ancestry,
        background, charClass, deity} = req.body;

        const newCharacter = await Character.create({
            firstName, lastName, gender, 
            level, ancestry, background, 
            charClass, deity, attributes
        });

        res.status(201).json(newCharacter);
        
    } catch (err) {
        res.json(err);
        next(err);
        
    };
});

//! GET ALL CHARACTERS route

router.get('/user/:id/characterlist', async (req, res, next) =>{

    const userId = req.params.id;

    try {
        const allChars = await User.findById(userId).populate("characters");

        res.status(200).json(allChars);
        
    } catch (err) {
        next(err);
    }
});

//! GET SINGLE CHARACTER route

router.get('/character/:id', async (req, res, next) => {

    const charId = req.params.id;

    try {
        const specificChar = await Character.findById(charId);
        res.status(200).json(specificChar);
        
    } catch (err) {
        next(err);
    }
});

//! EDIT (put) SINGLE CHARACTER route

router.put('character/:id', async(req, res, next) => {

    try {

        const {id} = req.params;
        const charId = id;
        const {
            firstName, lastName, gender, 
            level, ancestry, background, 
            charClass, deity, attributes
        } = req.body;

        const updatedChar = await Character.findByIdAndUpdate(id, {
            firstName, lastName, gender, 
            level, ancestry, background, 
            charClass, deity, attributes
        }, {new: true});

        res.status(200).json(updatedChar);
        
    } catch (err) {
        next(err);
    }
});

//! DELETE (delete) SINGLE CHARACTER route

router.delete('/character/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const charId = id;

        const deletedChar = await Character.findByIdAndDelete(charId);

        //Checking for Last Names because of Syntax shenanigans
        if(deletedChar.lastName) {
            res.status(200).json({message: `The character with the id '${charId}' and name '${deletedChar.firstName} + ${deletedChar.lastName}' (${deletedChar.charClass}) was deleted successfully.`});
        } else {
            res.status(200).json({message: `The character with the id '${charId}' and name '${deletedChar.firstName}' (${deletedChar.charClass}) was deleted successfully.`});
        }
    } catch (err) {
        next(err); 
    };
});

module.exports = router;