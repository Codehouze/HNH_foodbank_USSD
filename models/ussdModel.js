const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ussdSchema = new Schema({
    phoneNumber:{
        type: String,
        required: true
    },
    serviceCode:{
        type: String,
        required: true
    },
    sessionId:{
        type: String,
        required: true
    },
    networkCode: {
        type: String,
        required: true
    },
    referenceNumber:{
        type: String,
        required: true
        
    },
    status:{
        type: String,
        default:"processing"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ussd', ussdSchema);