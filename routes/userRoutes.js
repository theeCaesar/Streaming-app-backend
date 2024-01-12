const exp = require('express');
const authControllers = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');

router = exp.Router();

router.route('/signup').post(authControllers.signup());
router.route('/login').post(authControllers.login);
router.route('/forgetPassword').post(authControllers.forgetPassword);
router.route('/resetPassword/:token').patch(authControllers.resetPassword);
router
  .route('/updatePassword')
  .patch(authControllers.protect, authControllers.updatePassword);

module.exports = router;
