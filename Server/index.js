var cors=require('cors');
app.use(cors());

const express=require('express');
//var app=express();

const app = express()
app.use(cors(
{
    origin:[""],
    methods:["POST","GET"],
    credentials:true
}
));

var bodyparser=require("body-parser");
app.use(bodyparser.json());









const dbconnect=require('./dbconnect');
const usercontroller=require('./Controller/usercontroller');
const bookcontroller=require('./Controller/bookcontroller')
const ordercontroller=require('./Controller/ordercontroller');
const cartcontroller=require('./Controller/cartcontroller');
const admincontroller=require('./Controller/admincontroller');
const sellercontroller=require('./Controller/sellercontroller');
const authverify=require('./midilware/authverify')


app.use('/user',usercontroller);
app.use('/book',bookcontroller)
app.use('/order',ordercontroller)
app.use('/cart',cartcontroller);
app.use('/admin',admincontroller);
app.use('/seller',sellercontroller);

app.listen(5000,()=>{
    console.log('App is running on 5000');
})
