const mongoose=require('mongoose');
const url='mongodb+srv://shaqlinmondal8905:shaqlinmondal8905@cluster0.inyi41n.mongodb.net/bookorder?retryWrites=true&w=majority';
//
//mongodb+srv://suman86:Suman123@cluster0.xp11dzy.mongodb.net/bookorderproject?retryWrites=true&w=majority
mongoose.set('strictQuery', true);
mongoose.connect(url)
.then(connect=>{
    console.log("Database connectivity done");
})
.catch(error=>{
    console.log("Error in database connectivity"+JSON.stringify(error,undefined,2));
    process.exit();
})
module.exports=mongoose;

