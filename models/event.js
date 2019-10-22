const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    postCode: {
        type: Number
    },
    state: {
        type: String
    },
    time: {
        type: Date
    },
    photo: {
        type: String
    },
    accepted: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    comments: [
        {
            commentBody: {
                type: String,
                required: true
            },
            commentDate: {
                type: Date,
                default: Date.now
            },
            commentUser: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ]
});

mongoose.model("events", EventSchema, "events");
