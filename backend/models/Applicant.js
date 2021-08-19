const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobAppSchema = new Schema({
    UserId:{
        type: String,
        required:true,
        index: {unique:true}
    },
	name: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false,
		default: Date.now
	},
    Education:[{ Institution_name:{ type:String,required:true},
        Start_year:{ type:Number,max:9999,min:0,required:true },
        End_year:{type:Number,max:9999,min:0}
    }],
    Skill:{
        type:Array,
        minlength:1
    },
    Rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    }
});

const  JobApp = mongoose.model("Applicant", JobAppSchema);
module.exports = JobApp;
