const express = require('express');
const router = express.Router()

const { updateUser, deleteUser, getUser, getallUser } = require('../controllers/userCtrl');
const {verifyUser,verifyAdmin} = require('../utils/verifyToken');


//update
router.put('/:id',verifyUser,updateUser)
//delete
router.delete('/:id',verifyUser, deleteUser)
//get:id
router.get('/:id',verifyUser, getUser)
//get
router.get('/',verifyAdmin, getallUser)


module.exports = router;