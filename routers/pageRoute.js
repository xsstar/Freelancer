const express = require('express');
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const { body } = require('express-validator');

const router = express.Router();

// USER REGISTER & LOGIN

router.route('/register').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),

    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists!');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('Please Enter A Password'),
  ],

  authController.createUser
);
router.route('/login').post(redirectMiddleware, authController.loginUser); //user login
router.route('/logout').get(authController.logoutUser); //user logout

// INDEX & USER PAGE

router.route('/user').get(authMiddleware, pageController.getUserPage);
router.route('/').get(pageController.getIndexPage);

// CONTACT MESSAGE
router.route('/contact').post(pageController.sendEmail);


module.exports = router;
