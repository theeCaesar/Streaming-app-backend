const exp = require('express');
const authControllers = require('../controllers/authControllers');
const moviesControllers = require('../controllers/moviesControllers');

router = exp.Router();

router
  .route('/upload')
  .post(authControllers.protect, moviesControllers.uploadMovie);

module.exports = router;
