const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')

const loginController = () => {

}
const registerController = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.email })
        if (exisitingUser) {
            return res.status(200).send({ message: 'User Already Exist', success: false })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        req.body.password = hashPassword;
        const newUser = new userModel(req.body)
        await newUser.save();
        res.status(201).send({ message: 'Signup Successfully', success: true })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` })
    }
}

module.exports = { loginController, registerController };