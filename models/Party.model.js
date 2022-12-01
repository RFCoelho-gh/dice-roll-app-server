const {Schema, model} = require('mongoose');

const partySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
        },
        characters: [{
            type: Schema.Types.ObjectId, ref: "Character"
        }],
    },
    {
        timestamps: true,
    }
);

const Party = model("Party", partySchema);

module.exports = Party;