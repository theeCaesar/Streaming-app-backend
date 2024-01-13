const exp = require('express');
const authControllers = require('../controllers/authControllers');
const roomControllers = require('../controllers/roomControllers');

router = exp.Router();

router.route('/').post(authControllers.protect, roomControllers.createRoom);
router
  .route('/join-room:id')
  .get(authControllers.protect, roomControllers.joinRoom);

module.exports = router;
