const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/Users');
const reviewModel = require('./models/review');
const brcypt = require("bcrypt");
const PORT= 8080;

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/users");

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email : email})
    .then(user=>{
        
        if(user){
            brcypt.compare(password, user.password, (err, response)=> {
                if(err){
                    return res.json("The password is incorrect")
                } 
                if(response){
                    res.json("Success")
                }
            })
        }else{

            res.json("No record existed")
        }
    })
})

app.post('/', (req, res)=>{
    const {name, email, password, city} = req.body;
    brcypt.hash(password, 10)
    .then(hash =>{
        UserModel.create({name, email, password:hash, city})
        .then(users => res.json(users))
        .catch(err => res.json(err));
    }).catch(err => console.log(err.message))
    
})

app.post("/home/breweries/:id/review", (req, res)=>{
    reviewModel.create(req.body)
    .then((review) => res.json(review))
    .catch((err)=> res.status(500).json(err));
})
app.get('/home/breweries/:id/review' , async(req,res)=>{
    try{
        const reviews = await reviewModel.find({ breweryId: req.params.id});
        res.status(200).json(reviews);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`);
})
