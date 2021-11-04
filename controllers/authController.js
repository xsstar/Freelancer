const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.flash('success', 'User created! Please Login..');
    res.status(201).redirect('/');
  } catch (error) {
    const errors = validationResult(req);

/*     // console.log(errors);
    // console.log(errors.array()[0].msg);

     for (let i = 0; i <errors.array().length; i++) {
    req.flash("error", `${errors.array()[i].msg}`);
  }

  res.status(400).redirect('/register'); */

    res.status(400).json({
      status: 'fail',
      errors,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/user');        
          } else {
            req.flash('error', 'Your password is not correct!');
            res.status(400).redirect('/');
          }
        });
      } else {
        req.flash('error', 'User is not exist!');
        res.status(400).redirect('/');
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};