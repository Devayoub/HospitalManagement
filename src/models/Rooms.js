/*
    mongoDB Schema for rooms
*/

const mongoose = require ('mongoose');

var RoomSchema = mongoose.Schema({
	name: {
        type: String,
        unique: true,
	   required: true,
    },
    availability: {
        type: Boolean,
        default: true
    }
});


module.exports = RoomSchema
