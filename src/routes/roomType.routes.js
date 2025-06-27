const express = require('express');
const router = express.Router();
const RoomTypeController = require('../controllers/roomType.controller');

router.get('/', RoomTypeController.getAll);
router.post('/', RoomTypeController.create);

module.exports = router;
