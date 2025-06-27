const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/room.controller');

router.get('/', RoomController.getAll);
router.get('/available', RoomController.getAvailable);
router.post('/', RoomController.create);

module.exports = router;
