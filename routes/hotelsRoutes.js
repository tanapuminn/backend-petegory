const express = require('express');
const router = express.Router()
const { createHotel, updateHotel, deleteHotel, getHotel, getallHotel } = require('../controllers/hotelCtrl');
const { verifyAdmin } = require('../utils/verifyToken');

//create
router.post('/',verifyAdmin, createHotel)
//update
router.put('/:id',verifyAdmin,updateHotel)
//delete
router.delete('/:id',verifyAdmin, deleteHotel)
//get:id
router.get('/:id', getHotel)
//get
router.get('/', getallHotel)

module.exports = router;