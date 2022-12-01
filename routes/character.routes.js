const router = require('express').Router();
const Character = require('../models/Character.model');
const User = require('../models/User.model');

//! SAVE CHARACTER (POST route)

router.post('/save-character', async (req, res, next) => {

    try {

        const {firstName, lastName, gender, level, ancestry,
        background, charClass, deity, attributes, descriptions} = req.body;

        const newCharacter = await Character.create({
            firstName, lastName, gender, 
            level, ancestry, background, 
            charClass, deity, attributes,
            descriptions 
        });

        //Find correct User?

        await User.findByIdAndUpdate(
            newCharacter,
            {$push: {characters: newCharacter._id}}
        );

        res.status(201).json(newCharacter);
        
    } catch (err) {
        next(err);
    };
});

//! GET ALL CHARACTERS route, regardless of User

router.get('/characterlist/global', async (req, res, next) =>{

    //const {id} = req.params;
    //const userId = id;

    try {
        //const globalChars = await User.findById(userId).populate("characters");

        const globalChars = await Character.find();

        res.status(200).json(globalChars);
        
    } catch (err) {
        next(err);
    };
});

//! GET ALL CHARACTERS OF LOGGED IN USER

//TODO Route goes here

//! GET SINGLE CHARACTER route

router.get('/character/:id', async (req, res, next) => {

    const {id} = req.params;
    const charId = id;

    try {
        const specificChar = await Character.findById(charId);
        res.status(200).json(specificChar);
        
    } catch (err) {
        next(err);
    };
});

//! EDIT (put) SINGLE CHARACTER route

router.put('/character/:id', async(req, res, next) => {

    const {id} = req.params;
    const charId = id;
    const {
        firstName, lastName, gender, 
        level, ancestry, background, 
        charClass, deity, attributes
    } = req.body;

    try {

        const updatedChar = await Character.findByIdAndUpdate(charId, {
            firstName, lastName, gender, 
            level, ancestry, background, 
            charClass, deity, attributes
        }, {new: true});

        res.status(200).json(updatedChar);
        
    } catch (err) {
        next(err);
    };
});

//! DELETE (delete) SINGLE CHARACTER route

router.delete('/character/:id', async (req, res, next) => {

    const {id} = req.params;
    const charId = id;

    try {

        const deletedChar = await Character.findByIdAndDelete(charId);

        // Checking for 'Last Names' because of Syntax shenanigans,
        // since lastName is not 'required' on Char Model
        if(deletedChar.lastName) {
            res.status(200).json({message: `The character with the id '${charId.slice(-4).toUpperCase()}' and name '${deletedChar.firstName} ${deletedChar.lastName}' (${deletedChar.charClass}) was deleted successfully.`});
        } else {
            res.status(200).json({message: `The character with the id '${charId.slice(-4).toUpperCase()}' and name '${deletedChar.firstName}' (${deletedChar.charClass}) was deleted successfully.`});
        }
    } catch (err) {
        next(err); 
    };
});





module.exports = router;