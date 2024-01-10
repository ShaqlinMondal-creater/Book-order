const myscheema=require('mongoose');

const book=myscheema.Schema({
    bookname:{type:String},
    author:{type:String},
    publisher:{type:String},
    bookId:{type:String},
    bookImage:{type:String},
    sideimg:{type:Array},
    category:{type:String},
    price:{type:Number},
    description:{type:String},
    sellerId:{type:String},
    sellername:{type:String},
   

},{
    timestamps:true,
})

module.exports=myscheema.model('booksdata',book);