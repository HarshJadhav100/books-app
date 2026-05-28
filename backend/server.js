require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth')

const cors= require('cors');

const app = express();

app.use(express.json());
app.use(cors());
    

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("connected!!!")).catch(()=>console.log("Error whille connection"));

app.use('/api/books',bookRoutes);
app.use('/api/auth',authRoutes)

app.get('/',(req,res)=>{
    res.json({message:"Api is running sucessfully"})

})

app.listen(5000,()=>{
    console.log("server is running on port 5000!");
})