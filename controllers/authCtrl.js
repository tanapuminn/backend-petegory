const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')
const createError = require('../utils/error')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
    try {
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        await newUser.save();
        res.status(200).send('User has been created.')
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) return next(createError(404, 'User not found!!'))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect)
            return next(createError(400, 'Wrong password or email!'))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },process.env.JWT);

        const { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie('access_token', token, {httpOnly: true}).status(200).send({ ...otherDetails }).json({isAdmin: user.isAdmin,Status: 'success'  })
    } catch (error) {
        next(error)
    }
}

module.exports = { signup, login };