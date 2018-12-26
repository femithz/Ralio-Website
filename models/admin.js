var mongoose=require('mongoose');
var Schema=mongoose.Schema
var bcrypt=require('bcryptjs');

var AdminSchema=mongoose.Schema({
    admin_id:mongoose.Schema.Types.ObjectId,
    username:{
    	type:String,
    	require:true
    },
    password:{
       type:String,
       require:true
    },
    creation_dt:{
        type:Date,
    	require:true
    },
    isAdmin:{  
        type:Boolean,
        default:false
    },
});

AdminSchema.statics.hashPassword=function hashPassword(password){
    return bcrypt.hashSync(password,10)
}
AdminSchema.methods.isValid=function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword,this.password);
}

module.exports=mongoose.model('Admin', AdminSchema);