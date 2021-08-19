const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
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
    ContactNum:{
        type:Number,
        required:true
    },
    Bio:{
        type: String,
        required: true
    },
    JobAppref:[{
        type:String,
        ref:'Applications'
    }],
    AppIds:{
        type:Array
    }
});

const  Recruit = mongoose.model("Recruiter", RecruiterSchema);
module.exports = Recruit;
