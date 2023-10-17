const express = require('express')
const cors=require("cors");
require("./db/config")
const User = require("./db/User")
const products=require("./db/Product");
const Product = require('./db/Product');
const app = express()
const port = 3000

//-----------------------MIDDLEWARES-----------------------
app.use(express.json());
app.use(cors());

//--------------------------------------------AUTH LOGIN AND REGISTER  START---------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
app.post("/register",async (req,resp)=>{
    let user=new User(req.body);
    let result=await user.save()
    result = result.toObject();
    delete result.password;
    resp.send(result);
})

app.post("/login",async (req,resp)=>{
    //---------------------------------- .select("-password") --------To hide some field in the output or in console
    console.log(req.body);
    if(req.body.email && req.body.password){
        let user=await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user);
        }
        else{
            resp.send({result: "Not Found"})
        }
    }
    else{
        resp.send({result: "Not Found"})
    }
})

//--------------------------------------------AUTH LOGIN AND REGISTER  END---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------PRODUCT ROUTES_------------------------------------------------------------


//---------------------------------------------------ADD PRODUCT------------------------------------------------
app.post("/add-product", async (req,resp) =>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

//---------------------------------------------------GET ALL PRODUCT LIST---------------------------------------

app.get("/products", async (req,res)=>{
    let products = await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send({result : "No products found"})
    }
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))