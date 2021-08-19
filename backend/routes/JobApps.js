var express = require("express");
const { now } = require("mongoose");
var router = express.Router();

//Load JobApp model
const JobApp = require("../models/Applicant")

router.get("/", function(req, res){
    JobApp.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
    })
});

//GET user details
router.get("/fetchprofile1",function(req,res,next){
    if(req.session.token && req.session.role==="App"){
        JobApp.findOne({UserId: req.session.token})
            .then((error,user) =>{
                if(error){
                    return next(error);
                }else{
                    if(user===null){
                        var err = new Error('Not authorized!');
                        err.status = 400;
                        return next(400);
                    }else{
                        return res.json(user)
                    }
                }
            })
    }
    else{
        res.status(400).json({msg:"Invaild profile or Login",req})
    }
});

//POST Add user details
router.post("/Addprofile1",(req,res,next)=>{
    if(req.session.token ){
        JobApp.findOne({UserId: req.session.token}).then(user =>{
            if(user)return res.status(400).json({msg:"User data exists"})
            else{
                const newData = new JobApp({
                    UserId : req.session.token,
                    name: req.body.name,
                    date: req.body.date,
                    Education: req.body.Education,
                    Skill: req.body.Skill,
                    Rating: req.body.Rating
                })
                newData.save()
                .then(user3 => res.status(200).json({msg:"success",user3}))
                .catch(err => {console.log(err);res.json({msg:"ok",err}) })
            }
        })
    }
    else{
        res.status(400).json({msg:'Not authorized! Go back!',id: req.session.token})
    }
})

// POST update data
router.post("/Upprofile1",(req,res,next) =>{
    if(req.session){
        const field = req.body.name
        JobApp.updateOne({Userid:req.session.userId},{ [field]:req.body.value},function(err,user){
            if(err) return next(err);
            else{
                if(user===null){
                    var err1 = new Error('Not authorized');
                    err1.status = 400;
                    return next(err1);
                }
                else return res.status(200).json({msg:"sucess"});
            }
        })
    }
})

module.exports = router;