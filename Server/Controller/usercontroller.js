const express = require('express');
const router = express.Router();
const userModel = require('../Model/usermodel');
const otpModel = require('../Model/otp');
const jwt=require('jsonwebtoken')



const crypto = require("crypto");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { send } = require('process');
const { response } = require('express');
const authtoken=require('../midilware/authverify');


router.post('/register', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((encpass) => {
            const userregobj = new userModel({
                username: req.body.username,
                useremail: req.body.useremail,
                mobileno: req.body.mobileno,
                password: encpass,
                surname: req.body.surname,
                address: req.body.address,
                userid: req.body.username + crypto.randomBytes(3).toString("hex"),

            })
            userModel.find({ $or: [{ "mobileno": req.body.mobileno }, { "useremail": req.body.useremail }] })
                .then(findata => {
                    if (findata.length == 0) {
                        userregobj.save()
                            .then(userdata => {
                                res.status(200).send(userdata);
                                console.log(req.body);
                            })
                    }
                    else {
                        res.status(202).send([]);
                        console.log("Email and phone no already exists");
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


router.get('/viewall', (req, res) => {
    userModel.find()
        .then(alldata => {
            if (alldata.length > 0) {
                res.status(202).send(alldata);
            }
            else {
                res.status(400).send([]);
                console.log("No data available");
            }
        })
        .catch(error => {
            console.log({ msg: error });
        })

})

router.delete('/delete/:userid', (req, res) => {
    userModel.findOneAndRemove({ "userid": req.params.userid })
        .then(deletedata => {
            res.send(deletedata);
        })
        .catch(error => {
            console.log({ msg: error });
        })
})

router.get('/search/:useremail',authtoken, (req, res) => {
    // userModel.find({ "useremail": { $regex: req.params.username, $options: "i" } }).sort("-username")
    userModel.find({ "useremail": req.params.useremail })
        .then(findata => {
            if (findata.length > 0) {
                res.status(202).send(findata);
            }
            else {
                res.send([]);
                console.log("No data found");
            }
        })
        .catch(error => {
            console.log({ msg: error });
        })
})

router.put('/update/:userid',(req, res) => {
    userModel.findOneAndUpdate({ "userid": req.params.userid },
        {
            $set: {
                username: req.body.username,
                surname: req.body.surname,
                address: req.body.address,
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

router.post('/login', (req, res) => {
    userModel.find({ "useremail": req.body.useremail })
        .then(findata => {
            if (findata.length > 0) {
                // console.log("enterdpassword:" + req.body.password)
                // console.log("storepassword:" + findata[0].password)
               const payload={
                    useremail:req.body.useremail
               }
               const token=jwt.sign(payload,"usertoken")
                bcrypt.compare(req.body.password, findata[0].password)
                    .then(result => {
                        if (result == true) {
                            res.status(200).send(findata);
                            console.log("Login Success");
                            console.log(token);
                            // return res.json({token:token,data:result,success:true})
                           
                        }
                        else {
                            res.status(202).send([]);
                            console.log("Login Error");
                        }


                    })
                    .catch(error => {
                        console.log({ msg: "Password is incorrect" })
                    })
            }
            else {
                res.status(202).send([]);
                console.log("Login Error");
            }

        })
        .catch(error => {
            console.log({ msg: error });
        })
})

router.put('/changepassword', (req, res) => {
    userModel.find({ "useremail": req.body.useremail })
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
                                userModel.findOneAndUpdate({ "useremail": req.body.useremail }, {
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


router.post('/sendotp', (req, res) => {
    userModel.find({ "useremail": req.body.useremail })
        .then(finddata => {
            if (finddata.length > 0) {
                let otpcode = Math.floor((Math.random() * 10000) + 1);
                const otpobj = new otpModel({
                    "useremail": req.body.useremail,
                    "code": otpcode,
                    "expireIn": new Date().getMinutes() + 2
                })
                otpobj.save()
                    .then(resdata => {
                        res.status(200).send(resdata);
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: 'pustakpvtltd.co@gmail.com',
                                pass: 'jthpflvhzogmavkj'
                            }

                        });


                        var mailOptions = {
                            from: 'pustakpvtltd.co@gmail.com',
                            to: req.body.useremail,
                            subject: 'Otp Verify',
                            text: 'Password reset request for Pustak.Your Otp is' + otpcode
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    })

            }
            else {
                return res.send({ success: false, msg: "Not found" });
            }
        })
        .catch(err => {
            console.log({ msg: err });
        })
})

router.post('/otpverify', (req, res) => {
    otpModel.find({ $and: [{ "useremail": req.body.useremail }, { "code": req.body.code }] })
        .then(findata => {
            if (findata.length > 0) {
                res.status(200).send(findata)
            }
            else {
                res.status(202).send([])
            }
        })
        .catch(error => {
            console.log(error);
        })
})

router.put('/resetpassword', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(encpass => {
            userModel.findOneAndUpdate({ "useremail": req.body.useremail }, {
                $set: {
                    "password": encpass
                }
            }, {
                new: true
            })
                .then(updatepassword => {
                    if(updatepassword!=null){
                        res.status(201).send(updatepassword);
                        console.log(updatepassword);
                        console.log("Password changed");
                    }
                    else{
                        res.status(202).send([])
                    }
                    
                })
                .catch(error => {
                    console.log(error);
                })
        })


        .catch(error => {
            console.log(error);
        })
})



module.exports = router;
