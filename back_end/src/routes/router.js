const express = require('express');
const router = express.Router();

/** import all controllers */
const controller = require('../Controllers/controller.js');
// import { registerMail } from '../Controllers/mailer.js'
const localVariables  = require('../middleware/auth');
const  Auth  = require('../middleware/auth');

router.route('/').get(controller.home); // home page

// // /** POST Methods */
router.route('/register').post(controller.register); // register user
// router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.login); // login in app

// // /** GET Methods */
router.route('/user').get(controller.getUser) // user with username
// router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP) // generate random OTP
// router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


// // /** PUT Methods */
router.route('/updateuser').put(Auth.Auth,controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword); // use to reset password



module.exports = router;