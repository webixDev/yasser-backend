const mongoose = require("mongoose")
const utils = require('../util');
const { Schema } = mongoose;

const serviceSchema = new mongoose.Schema({
    mainTitle :{
        type:String,
       
    },
    titleOne :String,
    titleTwo:String,
    titleThree :String,
    titleFour :String,
    price:Number,
    posted: {
        type: String,
        default: utils.getCurretDate()
    },

})

module.exports =  mongoose.model('Service',serviceSchema)