const myscheema = require("mongoose");

const order = myscheema.Schema(
  {
    orderId: { type: String },
    bookId: { type: String },
    sellerId: { type: String },
    sellername:{type:String},
    bookname:{type:String},
    category:{type:String},
    bookImage:{type:String},
    author:{type:String},
    publisher:{type:String},
    userId: { type: String },
    quantity: { type: Number },
    totalprice: { type: Number },
    mobileno:{type:String},
    price:{type:Number},
    name: { type: String },
    address: { type: String },
    orderdate: { type: String },
    shippingdate: { type: String },
    orderstatus:{type:String}
  },
  {
    timestamps: true,
  }
);

module.exports = myscheema.model("orderdata", order);
