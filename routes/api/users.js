const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req,res) => res.json({msg:"Users Works"}));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register',(req,res) => {
  // Check Validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);   
  }
  User.findOne({email: req.body.email})
    .then(user => {
    if(user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });
      
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      
      bcrypt.hash(newUser.password,10,(err,hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
        })
    }
  })
})

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

router.post('/login', (req,res) => {
  // Check Validation
  const { errors, isValid } = validateLoginInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);   
  }

  const email =  req.body.email;
  const password = req.body.password;
  
  // Find user by email
  User.findOne({email})
    .then(user => {
      // check user
      if(!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }
      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // Create JWT payload
            const payload = {id: user.id,name: user.name, avatar: user.avatar}
            // Send token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err,token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            });
          } else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
      })
  })
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current',passport.authenticate('jwt',{ session:false }),(req,res) => {
  res.send(req.user);
});

module.exports = router;