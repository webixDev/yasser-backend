const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    },
// Store countries as an array of strings
    ip:{type: String}  ,
    country: {type: String }
});

module.exports = mongoose.model('Analysis', AnalysisSchema);