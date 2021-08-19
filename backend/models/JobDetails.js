const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobDetailsSchema = new Schema({
    Title:{
        type:String,
        required:true
    },
	name: {
		type: String,
		required: true
    },
    email:{
        type:String,
        required:true
    },
	date:{
		type: Date,
		required: true,
		default: Date.now
    },
    Deadline:{
        type:Date,
        required:true
    },
    Skills:{
        type:Array,
    },
    Type_job:{
        type:String,
        enum:["Full-time","Part-time","Work from Home"],
        required:true
    },
    Duration:{
        type: Number,
        min:0,
        max:6,
        required:true
    },
    Sal:{
        type:Number,
        require:true
    },
    Rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    UserId:{
        type:String,
        required:true
    }
});

const  JobApp = mongoose.model("Applications", JobDetailsSchema);
module.exports = JobApp;
