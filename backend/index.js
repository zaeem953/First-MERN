const express = require('express')
const cors=require("cors");
require("./db/config")
const User = require("./db/User")
const app = express()
const port = 3000

//-----------------------MIDDLEWARES-----------------------
app.use(express.json());
app.use(cors());


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


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))