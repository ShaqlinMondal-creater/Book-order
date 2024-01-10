const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const current = new Date();
const orderModel = require('../Model/ordermodel');

const {addDays}=require('date-fns');
const date=new Date();


router.post('/order',(req,res)=>{
    function randomNumber(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
    }
    const random = randomNumber(3, 15);
    console.log(random);
    const orderobj = new orderModel({
        orderId:"OD"+crypto.randomBytes(4).toString('hex'),
        bookId:req.body.bookId,
        sellerId:req.body.sellerId,
        sellername:req.body.sellername,
        bookname:req.body.bookname,
        category:req.body.category,
        bookImage:req.body.bookImage,
        author:req.body.author,
        publisher:req.body.publisher,
        userId:req.body.userId,
        price:req.body.price,
        name:req.body.name,
        address:req.body.address,
        mobileno:req.body.mobileno,
        quantity:req.body.quantity,
        totalprice:req.body.totalprice,
        orderstatus:req.body.orderstatus,
        orderdate:new Date().toDateString()+" "+new Date().toLocaleTimeString(),
        shippingdate:addDays(date,random).toDateString()
    });

    orderobj.save()
    .then(order =>{
        res.status(200).send(order);
    }).catch(err =>{
        res.status(500).send('error in order save');
    });
}
);

router.put('/cancelorder/:orderId',(req,res)=>{
    orderModel.findOneAndUpdate({"orderId":req.params.orderId},{
        $set:{
            "orderstatus":req.body.orderstatus
        }
    },{
        new:true
    })
    .then(orderdelete =>{
        res.status(200).send(orderdelete);
    }).catch(err =>{
        res.status(500).send('error in order cancle');
    });
});

router.get('/vieworder/:userId',(req,res)=>{
    orderModel.find({"userId":req.params.userId}).sort({$natural:-1})
    .then(vieworder =>{
        res.status(200).send(vieworder);
    }).catch(err =>{
        res.status(500).send('error in view order');
    });
});
router.get('/vieworderbyseller/:sellerId',(req,res)=>{
    orderModel.find({"sellerId":req.params.sellerId}).sort({$natural:-1})
    .then(vieworder =>{
        res.status(200).send(vieworder);
    }).catch(err =>{
        res.status(500).send('error in view order');
    });
});
router.get('/viewallorder',(req,res)=>{
    orderModel.find().sort({$natural:-1})
    .then(vieworder =>{
        res.status(200).send(vieworder);
    }).catch(err =>{
        res.status(500).send('error in view order');
    });
});

module.exports = router;