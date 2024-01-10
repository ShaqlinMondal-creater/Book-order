const myscheema = require("mongoose");

const otp=myscheema.Schema({
    useremail:{type:String},
    code:{type:String},
    expireIn:{type:Number}
   
},{
    timestamps:true,
})

module.exports=myscheema.model('otpdata',otp);