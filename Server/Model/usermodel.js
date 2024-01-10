const myscheema=require('mongoose');

const user=myscheema.Schema({
    username:{type:String,require:true},
    useremail:{type:String,require:true},
    mobileno:{type:Number,require:true},
    password:{type:String,require:true},
    userid:{type:String,require:true},
    address:{type:String,require:true},
    surname:{type:String,require:true},
    profile:{type:String,require:true,default:"https://res.cloudinary.com/dr0ezjcyy/image/upload/v1672933334/Angular/a99dovnp5ctoedj0xhkv.jpg"},

},{
    timestamps:true,
})

module.exports=myscheema.model('userdata',user);