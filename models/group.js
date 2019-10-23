const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    members: {
        type: Array,
        ref: "users",
        person: [{firstName: String, lastName: String, email: String}]
    },
    hosts: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    photo: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

mongoose.model("groups", GroupSchema, "groups");
