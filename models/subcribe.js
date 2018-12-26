var mongoose=require('mongoose');
var Schema=mongoose.Schema

var SubcribeSchema=mongoose.Schema({
    email:{
    	type:String,
    	require:true
    },
    subcribe_date:{
        type:Date,
    	require:true
    },
});

module.exports=mongoose.model('Subcribe', SubcribeSchema);