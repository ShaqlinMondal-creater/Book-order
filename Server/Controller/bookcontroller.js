const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const bookModel=require('../Model/bookmodel')


router.post('/addbook',(req,res)=>{
    const productobj = new bookModel(
        {
            bookId:crypto.randomBytes(4).toString('hex'),
            bookname:req.body.bookname,
            author:req.body.author,
            publisher:req.body.publisher,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category,
            sideimg:req.body.sideimg,
            sellerId:req.body.sellerId,
            sellername:req.body.sellername
        }
    );

    productobj.save()
    .then(insertobj =>{
        res.status(200).send(insertobj);
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'error in product save ' });
    });
});


router.delete('/deletebook/:bookId',(req,res)=>{
    bookModel.findOneAndDelete({"bookId":req.params.bookId})
    .then(result =>{
        res.status(200).send(result);
    }).catch(err =>{
        res.status(500).send({ message: "error in product delete " })
    });
});

router.put('/bookupdate/:bookId',(req,res)=>{
    bookModel.findOneAndUpdate({"bookId":req.params.bookId},{
       $set:{
            "bookname":req.body.bookname,
            "author":req.body.author,
            "publisher":req.body.publisher,
            "price":req.body.price,
            "description":req.body.description,
            "category":req.body.category,
            "sideimg":req.body.sideimg
       } 
    },{new: true}).then(updateresult =>{
        console.log(updateresult);
        if(updateresult != null)
            res.status(200).send(updateresult);
    }).catch(err =>{
        res.status(500).send({ message: "DB Problem..Error in UPDATE with id " });
    });
});

router.get('/booksearch/:bookname',(req,res)=>{
    bookModel.find({ "bookname": { $regex: req.params.bookname, $options: "i" } }).sort("-username")
    .then(searchresult =>{
        console.log(searchresult);
        res.status(200).send(searchresult);
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'search faild'})
    });
});

router.get('/searchbook/:bookId',(req,res)=>{
    bookModel.find({"bookId":req.params.bookId})
    .then(searchresult =>{
        console.log(searchresult);
        res.status(200).send(searchresult);
    }).catch(err =>{
        res.status(202).send({ message: err.message || 'search faild'})
    });
});
router.get('/searchbookbyseller/:sellerId',(req,res)=>{
    bookModel.find({"sellerId":req.params.sellerId})
    .then(searchresult =>{
        console.log(searchresult);
        res.status(200).send(searchresult);
    }).catch(err =>{
        res.status(202).send({ message: err.message || 'search faild'})
    });
});


router.get('/viewbooks',(req,res)=>{
    bookModel.find()
    .then(viewalldocument =>{
        res.status(200).send(viewalldocument)
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'view is faild'})
    })
});

router.get('/topbook',(req,res)=>{
bookModel.find().sort({_id:-1}).limit(4)
.then(bookdata=>{
    if(bookdata.length>0){
        res.status(200).send(bookdata);
    }
    
})
.catch(error=>{
    console.log(error);
})

})

router.get('/bookdetails/:bookId',(req,res)=>{
    bookModel.findOne({"bookId":req.params.bookId})
    .then(searchresult =>{
        console.log(searchresult);
        res.status(200).send(searchresult);
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'search faild'})
    });
});

module.exports=router;