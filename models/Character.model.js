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
        background: {
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
        attributes: {
            type: Object,
            attributes: {
                strength: {
                    type: Number,
                    default: 10,
                },
                dexterity: {
                    type: Number,
                    default: 10,
                },
                constitution: {
                    type: Number,
                    default: 10,
                },
                intelligence: {
                    type: Number,
                    default: 10,
                },
                wisdom: {
                    type: Number,
                    default: 10,
                },
                charisma: {
                    type: Number,
                    default: 10,
                }
            }
        },
        descriptions: {
            type: Object,
            descriptions: {
                ancestryDescription: {
                    type: String,
                },
                backgroundDescription: {
                    type: String,
                },
                classDescription: {
                    type: String,
                },
                deityDescription: {
                    type: String,
                },
            }
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model("Character", characterSchema)