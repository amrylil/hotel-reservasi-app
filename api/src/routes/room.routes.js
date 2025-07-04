const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/room.controller');
const uploadMiddleware = require('../middlewares/upload.middleware');

router.get('/', RoomController.getAll);
router.get('/available', RoomController.getAvailable);
router.post('/', uploadMiddleware.array('images', 5), RoomController.create);
router.get('/:id', RoomController.getById);

module.exports = router;
