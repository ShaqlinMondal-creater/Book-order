const express=require('express');
const router=express.Router();

const sellerModel=require('../Model/sellermodel');
const crypto = require("crypto");
const bcrypt = require('bcrypt');

router.post('/sellerregistration',(req,res)=>{
    bcrypt.hash(req.body.password,10)
    .then(sellerpass =>{
        const sellerobj = new sellerModel({
            sellername:req.body.sellername,
            selleremail:req.body.selleremail,
            mobile:req.body.mobile,
            password:sellerpass,
            sellerId:crypto.randomBytes(3).toString("hex"),
            address:req.body.address,
            profile: req.body.profile,
            confirmpassword:sellerpass,
            dob:req.body.dob
        })

        sellerModel.find({ $or: [{ "mobile": req.body.mobile }, { "selleremail": req.body.selleremail }] })
        .then(findata => {
            console.log(req.body.mobile)
            console.log(req.body.selleremail)
            if (findata.length == 0) {
                sellerobj.save()
                    .then(sellerdata => {
                        res.status(200).send([sellerdata]);
                        console.log(req.body);
                    })
            }
            else {
                res.status(202).send([]);
                console.log("Seller Email and phone no already exists");
            }
        })
        .catch(error => {
            console.log({ msg: error });
        })
    })
    .catch(error => {
        console.log("Error in data reg" + error);
    })

})

router.post('/sellerlogin',(req,res)=>{
    sellerModel.find({ "selleremail": req.body.selleremail })
        .then(findata => {
            if (findata.length > 0) {
                console.log("enterdpassword:" + req.body.password)
                console.log("storepassword:" + findata[0].password)
                bcrypt.compare(req.body.password, findata[0].password)
                    .then(result => {
                        if (result == true) {
                            res.status(200).send(findata);
                                console.log("Seller Login Success");
                            
                        }
                        else {
                            
                            res.status(202).send([]);
                            console.log("Seller Login Error");
                        }


                    })
                    .catch(error => {
                        console.log({ msg: "Seller Password is incorrect" })
                    })
            }
            else {
                res.status(202).send([]);
                console.log("Seller Login Error");
            }

        })
        .catch(error => {
            console.log({ msg: error });
        })
})

router.put('/sellerupdate/:sellerId', (req, res) => {
    sellerModel.findOneAndUpdate({ "sellerId": req.params.sellerId },
        {
            $set: {
                sellername: req.body.sellername,
                address: req.body.address,
                activeStatus:req.body.activeStatus,
                profile: req.body.profile

            }
        },
        {
            new: true
        })
        .then((updatedata) => {
            console.log(updatedata);
            if (updatedata != null) {
                res.status(203).send(updatedata);
            }
        })
        .catch(error => {
            console.log({ msg: error });
        })
})

router.get('/viewallseller', (req, res) => {
    sellerModel.find()
        .then(alldata => {
            if (alldata.length > 0) {
                res.status(202).send(alldata);
            }
            else {
                res.status(400).send([]);
                console.log("No data available in seller collection");
            }
        })
        .catch(error => {
            console.log({ msg: error });
        })

})
router.delete('/sellerdelete/:sellerId',(req,res)=>{
    sellerModel.findOneAndDelete({"sellerId":req.params.sellerId})
    .then(deleteseller =>{
        res.status(200).send(deleteseller);
    })
    .catch(error => {
        console.log({ msg: error });
    })
})

router.put('/changepassword', (req, res) => {
    sellerModel.find({ "selleremail": req.body.selleremail})
        .then(findata => {
            bcrypt.compare(req.body.password, findata[0].password)
                .then(result => {
                    if (result == true) {
                        console.log("Old Password  and new password are same");
                        return res.status(202).send([]);
                    }
                    else {
                        bcrypt.hash(req.body.password, 10)
                            .then(encpass => {
                                sellerModel.findOneAndUpdate({ "selleremail": req.body.selleremail }, {
                                    $set: {
                                        password: encpass
                                    }
                                },
                                    {
                                        new: true,
                                    })
                                    .then(updatePass => {
                                        if (updatePass != null) {
                                            res.status(201).send(updatePass);
                                        }
                                        else {
                                            res.status(202).send([]);
                                        }
                                    })
                                    .catch(error => {
                                        console.log({ msg: error });
                                    })
                            })
                            .catch(err => {
                                console.log("error in update password" + err);
                            })
                    }
                })
        })
})

module.exports = router;