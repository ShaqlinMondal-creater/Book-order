const jwt=require('jsonwebtoken')
const isuser=(req,res,next)=>{
    var token = req.headers.authorization.split(' ')[1];
    //var token = req.body.token || req.query.token || req.headers[ "x-access-token" ];
    const decode=jwt.verify(token,"usertoken")
    req.userdata=decode;
    next();
    // return res.json(decode);
}
module.exports=isuser