const myscheema=require('mongoose');

const addtocart=myscheema.Schema({
    bookId:{type: String},
    userId:{type: String},
    bookname:{type: String},
    author:{type: String},
    publisher:{type: String},
    price:{type: Number},
    description:{type: String},
    category:{type: String},
    bookImage:{type: String},
},{
    timestamps:true,
})

module.exports=myscheema.model('cartdata',addtocart);