const express= require('express');
const mongoose= require('mongoose');
const Product=require('./models/productmodel');
const app=express();



// routes 
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('hello Node api')
})
app.get('/blog',(req,res)=>{
    res.send('hello blog my name is sohaib')
})

app.get('/products', async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).send({message: err.message});
    }
})
app.get('/products/:id', async (req,res)=>{
    
    try{
        const {id}=req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).send({message: err.message});
    }
    
})
// update data

app.put('/products/:id', async (req,res)=>{
    try{
        const {id}  = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:"cannot find with the product with this id"})
        }
        const updated_product=await Product.findById(id)
        res.status(200).json(updated_product)
    }
    catch(err){
        res.status(500).send({message: err.message});

    }
})

// delete a product


app.delete('/products/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:"cannot delete"})

        }
        res.status(200).json(product)
        

    }
    catch(err){
        res.status(500).send({message: err.message});
    }
})
app.post('/product',async (req,res)=>{
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product);
   }
   catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message});
   }
})

mongoose.connect('mongodb+srv://akhtersohaib56:abcd1234@sohaibapi.yiwliuw.mongodb.net/Node-API?retryWrites=true&w=majority').then(()=>{
    console.log('connected to mongodb');
    app.listen(3000,()=>{
        console.log('Node api app is running on port 3000')
    })    
        
}).catch((err)=>{
    console.log("error connecting to db");
})