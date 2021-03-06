const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String
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
    date: {
        type: Date
    },
    time: {
        type: Date
    },
    photo: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: "groups"
    },
    accepted: {
        type: Array,
        ref: "users",
        person: [{firstName: String, lastName: String, email: String}]
    },
    comments: [
        {
            commentBody: {
                type: String
            },
            commentDate: {
                type: Date
            },
            commentUser: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ]
});

mongoose.model("events", EventSchema, "events");
