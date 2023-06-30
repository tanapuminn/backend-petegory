const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('Mongodb connected')
    } catch (error) {
        console.log('Mongodb error')
    }
}

module.exports = connectDB;