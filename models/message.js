var mongoose=require('mongoose');
var Schema=mongoose.Schema

var MessageSchema=mongoose.Schema({
    name:{
    	type:String,
    	require:true
    },
    email:{
    	type:String,
    	require:true
    },
    message:{
       type:String,
       require:true
    },
    sent_dt:{
        type:Date,
    	require:true
    },
});

module.exports=mongoose.model('Message', MessageSchema);