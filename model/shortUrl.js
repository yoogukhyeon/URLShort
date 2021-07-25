//mongoDB 스키마 
const mongoose = require('mongoose');
//shortid연결 
const shortid = require('shortid');
//스키마 생성 obj형태 
const shortUrlsSchema = new mongoose.Schema({
    full: {
        type: String,
        require: true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }

});

module.exports = mongoose.model('UrlShort' , shortUrlsSchema)