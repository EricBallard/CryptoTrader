const express = require('express');
const router = express.Router();

// Import controller functions
const {
  login,
  register,
  forgot,
  reset,
} = require('../controllers/auth');


// Rout request to controller
router.route('/register').post(register);

router.route('/login').post(login);

router.route('/forgot').post(forgot);

router.route('/reset/:resetToken').put(reset);

module.exports = router;