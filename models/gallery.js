var mongoose=require('mongoose');
var Schema=mongoose.Schema

var GallerySchema=mongoose.Schema({
    image:{
        type:String,
        data: Buffer,
    	require:true
    },
    imagename:{
    	type:String,
    	require:true
    },
    upload_date:{
        type:Date,
    	require:true
    },
});

module.exports=mongoose.model('Gallery',    GallerySchema);