const mongoose=require('mongoose')

const seller=mongoose.Schema({
    sellername:{type:String},
    selleremail:{type:String},
    mobile:{type:String},
    password:{type:String},
    confirmpassword:{type:String},
    sellerId:{type:String},
    address:{type:String},
    profile:{type:String,default:"https://res.cloudinary.com/dr0ezjcyy/image/upload/v1672933334/Angular/a99dovnp5ctoedj0xhkv.jpg"},
    activeStatus:{type:Boolean,default:false},
    dob:{type:String}

},{
    timestamps:true
})
module.exports=mongoose.model('sellerdata',seller)