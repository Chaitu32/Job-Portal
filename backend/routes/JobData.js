var express = require("express");
var router = express.Router();

const AppData = require("../models/JobDetails")

router.get("/AppRec",function(req,res,next){
    if(req.session.token && req.session.role==="App"){
        AppData.find(function(err,users){
            if(err){
                console.log(err);
            }else{
                res.json(users);
            }
        })
    }
})

//GET for Rec
router.get("/Appone",function(req,res,next){
    if(req.session.token && req.session.role==="Rec"){
        AppData.find({UserId:req.session.token},function(err,users){
            if(err){
                console.log(err);
            }else{
                res.json(users);
            }
        })
    }
})

//POST for register
router.post("/Register",(req,res,next)=>{
})