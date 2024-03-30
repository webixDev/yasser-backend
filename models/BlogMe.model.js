const mongoose = require("mongoose")
const utils = require('../util');
const partnerSchema = new mongoose.Schema({

    img: {
        type:String
    },
    title: {
        type:String
    },
    desc: {
        type:String
    },
    
    posted: {
        type: String,
        default: utils.getCurretDate()
    },
});
module.exports =  mongoose.model('BlogME',partnerSchema)