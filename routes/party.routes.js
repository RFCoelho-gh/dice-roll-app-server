const router = require('express').Router();
const Party = require('../models/Party.model');
const User = require('../models/User.model');
const Character = require('../models/Character.model');

//! POST party (create) route

router.post('/create-party', async (req, res, next) => {
    try {
        const {name} = req.body;

        const newParty = await Party.create({name});

        res.status(201).json(newParty);
        
    } catch (err) {

        next(err);
        
    };
});

//! GET ALL PARTIES route

router.get('user/:id/partylist', async (req, res, next) => {

    const {id} = req.params.id;
    const userId = id;

    try {
        const allParties = await User.findById(userId).populate("parties");

        res.status(200).json(allParties);

    } catch (err) {
        next(err);
    };
});

//! GET SINGLE PARTIES route

router.get('/party/:id', async (req, res, next) => {
    const {id} = req.params;
    const partyId = id;

    try {
        const specificParty = await Party.findById(partyId);
        res.stauts(200).json(specificParty);
        
    } catch (err) {
        next(err);
    }
});

//! EDIT (put) SINGLE Party route

router.put('/party/:id', async (req, res, next) => {
    const {id} = req.params;
    const partyId = id;
    const {name} = req.body;

    try {

        const updatedParty = await Party.findByIdAndUpdate(
            partyId, {name}, {new: true}
        );

        res.status(200).json(updatedParty);
        
    } catch (err) {
        next(err);
    };
});

//! DELETE SINGLE PARTY
//all chars kept

router.delete('/party/:id', async (req, res, next) => {

    const {id} = req.params;
    const partyId = id;

    try {

        const deletedParty = await Party.findByIdAndDelete(partyId)

        res.status(200).json({message: `The party with the id '${partyId.slice(-4)}' and name '${deletedParty.name}' was deleted successfully.`});
        
    } catch (err) {
        next(err);
    };
});