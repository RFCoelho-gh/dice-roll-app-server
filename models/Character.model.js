const {Schema, model} = require('mongoose');

const characterSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "Name is required."],
        },
        lastName: {
            type: String,
        },
        gender: {
            type: String,
            default: "other",
        },
        level: {
            type: Number,
            required: [true, "Level is required."],
            default: 1,
        },
        ancestry: {
            type: String,
            required: [true, "Ancestry is required."],
            default: "Human",
        },
        backgrond: {
            type: String,
            required: [true, "Background is required."],
            default: "Farmer",
        },
        charClass: {
            type: String,
            required: [true, "Class is required."],
            default: "Fighter",
        },
        deity: {
            type: String,
            default: "None",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Character", characterSchema)