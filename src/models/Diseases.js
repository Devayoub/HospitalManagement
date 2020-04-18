/*
	mongoDB Schema for diseases
*/
const mongoose = require ('mongoose');

var DiseaseSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
	   required: true 
    },
    score: {
        type: Number,
        required: true,
        default: 0
    }
});



module.exports = DiseaseSchema
