const mongoose = require('mongoose');
const _ = require('lodash');

// User Schema
var PatientSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	sex: {
		type: String,
		required: true,
		default: true
	},
	hospitalNumber: {
		type: String,
		required: true,
		unique: true
	},
	diseases: {
        type: Array,
        default: []
     },
     score: {
        type: Number,
	   required: true,
	   default: 0
     },
	room: {
		type: String,
		required: true,
		default: 'noroom'
	},

});





module.exports = PatientSchema
