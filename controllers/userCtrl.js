const userModel = require('../models/userModels')


const updateUser = async (req, res, next) => {
    try {
        const updateUser = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted.')
    } catch (error) {
        next(error)
    }
}
const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
const getallUser = async (req, res, next) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = { updateUser, deleteUser, getUser, getallUser};