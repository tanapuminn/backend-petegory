const hotelModels = require('../models/hotelModels');

const createHotel = async (req, res, next) => {
    const newHotel = new hotelModels(req.body);
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel)
    } catch (error) {
        next(error)
    }
}
const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await hotelModels.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (error) {
        next(error)
    }
}
const deleteHotel = async (req, res, next) => {
    try {
        await hotelModels.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel has been deleted.')
    } catch (error) {
        next(error)
    }
}
const getHotel = async (req, res, next) => {
    try {
        await hotelModels.findById(req.params.id)
        res.status(200).json(hotelModels)
    } catch (error) {
        next(error)
    }
}
const getallHotel = async (req, res, next) => {
    try {
        const hotels = await hotelModels.find()
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}


const getDetailHotels = async (req, res) => {
    try {
        const hotels = await hotelModels.find({ })
        res.send({
            status: 'ok',
            data: hotels
        })
    } catch (error) {
        console.log(error)
    }
}




module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getallHotel, getDetailHotels };