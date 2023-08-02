const express= require('express');
const mongoose= require('mongoose');
const app=express();



// routes 

app.get('/',(req,res)=>{
    res.send('hello Node api')
})
app.get('/blog',(req,res)=>{
    res.send('hello blog my name is sohaib')
})


mongoose.connect('mongodb+srv://akhtersohaib56:abcd1234@sohaibapi.yiwliuw.mongodb.net/Node-API?retryWrites=true&w=majority').then(()=>{
    console.log('connected to mongodb');
    app.listen(3000,()=>{
        console.log('Node api app is running on port 3000')
    })    
        
}).catch((err)=>{
    console.log("error connecting to db");
})