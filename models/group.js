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
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    hosts: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    photo: {
        type: String
    }
});

mongoose.model("groups", GroupSchema, "groups");
