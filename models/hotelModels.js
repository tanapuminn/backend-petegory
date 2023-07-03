const mongoose = require('mongoose')


const HotelSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    },
    title1:{
        type: String,
        require: true
    },
    title2:{
        type: String,
        require: true
    },
    title3:{
        type: String,
        require: true
    },
    title4:{
        type: String,
        require: true
    },
    title5:{
        type: String,
        require: true
    },
    status:{
        type: String,
        require: true,
        default: 'ready'
    }

})

const hotelModel = mongoose.model('Hotel',HotelSchema)
module.exports = hotelModel