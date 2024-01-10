const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const adminModel = require('../Model/adminmodel');


router.post('/adminregistration',(req,res)=>{
    bcrypt.hash(req.body.password,10)
    .then(adminpass =>{
        const adminobj = new adminModel({
          adminemail:req.body.adminemail,
          password:adminpass
      });
      adminobj.save()
      .then(adminsave =>{
        res.status(200).send(adminsave);
      }).catch(err =>{
        res.status(500).send('error in admin save');
      });   
    });
  });
  
router.post('/adminlogin',(req,res)=>{
    adminModel.find({"adminemail":req.body.adminemail})
    .then(getadmin =>{
      if(getadmin.length > 0)
      {
        let enteredpassword = req.body.password;
        let storedpassword = getadmin[0].password;
        bcrypt.compare(enteredpassword,storedpassword)
        .then(validation =>{
          if(validation == true){
            res.status(200).send(getadmin);
            console.log("Admin Login Success");
            
          } 
          else{
            res.status(202).send([]);
          }
          
        }).catch(err =>{
          res.status(500).send('error in password validation');
        });
      }
      else{
        res.status(202).send([]);
      }
    }).catch(err =>{
      res.status(500).send('error in email find');
    });
});

router.put('/updatepassword', (req, res) => {
  adminModel.find({ "adminemail": req.body.adminemail})
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
                            adminModel.findOneAndUpdate({ "adminemail": req.body.adminemail }, {
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