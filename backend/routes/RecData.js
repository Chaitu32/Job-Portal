var express = require("express");
var router = express.Router();

const RecData = require("../models/Recruiters")

//GET Details
router.get("/fetchprofile2",function(req,res,next){
    if(req.session.token && req.session.role==="Rec"){
        RecData.findOne({UserId: req.session.token})
            .exec(function(error,user){
                if(error) return next(error);
                else{
                    if(user===null){
                        var err = new Error('Not authorized!');
                        err.status = 400;
                        return next(400);
                    }else{
                        return res.send(user)
                    }
                }
            })
    }
})

//POST 
router.post("/Addprofile2",(req,res,next)=>{
    if(req.session.token ){
        RecData.findOne({Userid: req.session.token}).then(user =>{
            if(user)return res.status(400).json({msg:"User data exists"})
            else{
                const newData = new RecData({
                    UserId : req.session.token,
                    name: req.body.name,
                    date: req.body.date,
                    ContactNum: req.body.ContactNum,
                    Bio: req.body.Bio
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

//POST update data
router.post("/Upprofile2",(req,res,next) =>{
    if(req.session){
        const field = req.body.name
        RecData.updateOne({Userid:req.session.userId},{ [field]:req.body.value},function(err,user){
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