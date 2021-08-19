var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");

// Load User model
const User = require("../models/Users");
const { response } = require("express");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res,next) => {

    User.findOne({email: req.body.email}).then(user =>{
        if(user)return res.status(400).json({ email: "Email already exists" });
        else{
            const newUser = new User({
                email: req.body.email,
                date: req.body.date,
                password : req.body.password,
                jobtype: req.body.jobtype
            });

            bcrypt.genSalt(10, (err, salt) => {
              if(err) return next(err);
              bcrypt.hash(newUser.password, salt, (err1, hash) => {
                if(err1) return next(err1);
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {req.session.token = user._id;
                    req.session.role = user.jobtype;
                    res.status(200).json({msg:"success"})})
                  .catch(err1 => console.log(err1));
              });
            });
        }
    })
});

// POST request 
// Login
router.post("/login", (req, res, next) => {
  if(req.body.email && req.body.password ){
	// Authenticate user by email and password
    User.authenticate(req.body.email , req.body.password, function (error, user2) {

        if (error || !user2) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        } else {
            req.session.token = user2._id;
            req.session.role = user2.jobtype;
            return res.status(200).json(req.session);
        }
        });
  }
});

//GET logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({msg:"Logout sucessful"});
      }
    });
  }
});

//GET Profile
router.get("/profile", function (req, res, next) {
    User.findOne({ _id:req.session.token})
      .then(user => {
          if (user) {
            return res.json({email:user.email,jobtype:user.jobtype})
          }
          else{
            var err = new Error('Not authorized! Go back!');
            err.status = 400;
            return res.send(req.session);
          }
        
      });
  });



module.exports = router;

