const express = require('express');
const router = express.Router();
const cartModel=require('../Model/addtocartmodel');


router.post('/addtocart',(req,res)=>{
    const cartobj = new cartModel(
        {
            bookId:req.body.bookId,
            userId:req.body.userId,
            bookname:req.body.bookname,
            author:req.body.author,
            publisher:req.body.publisher,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category,
            bookImage:req.body.bookImage
        }
    );
    cartModel.find({ $and: [{ "userId": req.body.userId }, { "bookId": req.body.bookId }] })
    .then(cart=>{
        if(cart.length==0){
            cartobj.save()
            .then(cartsave =>{
                res.status(200).send(cartsave);
            })
        }
        else{
            res.status(202).send([]);
        }
    })
  
   .catch(err =>{
        res.status(500).send('error in cart save');
    });

});

router.get('/cartview/:userId',(req,res)=>{
    cartModel.find({"userId":req.params.userId}).sort({$natural:-1})
    .then(searchcart =>{
        res.status(200).send(searchcart);
    }).catch(err =>{
        res.status(500).send('error in search cart details');
    });
});


router.delete('/removecart/:userId/:bookId',(req,res)=>{
    cartModel.findOneAndDelete({ $and: [{ "userId": req.params.userId }, { "bookId": req.params.bookId }] })
    .then(productremove =>{
        res.status(200).send(productremove);
    }).catch(err =>{
        res.status(500).send('error in product remove');
    });
})

router.get('/countitem/:userId',(req,res)=>{
    cartModel.find({"userId":req.params.userId}).count()
    .then(countdata=>{
        res.json({no:countdata})
        console.log(countdata);
    })
    .catch(error=>{
        console.log(error);
    })
})

router.get('/alreadycart/:userId/:bookId',(req,res)=>{
    cartModel.find({ $and: [{ "userId": req.params.userId }, { "bookId": req.params.bookId }] })
    .then(product =>{
        res.status(200).send(product);
        
    }).catch(err =>{
        res.status(500).send(err);
    });
})

module.exports = router;