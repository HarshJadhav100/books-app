const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config();

router.post('/register',async(req,res)=>{
try{
    const{name,email,password}= req.body;

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.json({message:"Already an user"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const Newuser = new User({
        name,
        email,
        password: hashedPassword

    })

    await Newuser.save();
    res.json({message:"User Registered Sucessfully"})




}catch(error){

    res.json({message:"Unable to register the user"})

}
})

router.post('/login',async(req,res)=>{
    try{
        const{email,password}= req.body;

        const user = await User.findOne({email});

        if(!user){
            return  res.json({message:"User not found!"})
        }

        const isMatch =     await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({message:"Password did not matched!"})
        }

        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}

        );
        res.json({token,name:user.name})


    }catch(error){
        res.json({message:error.message})

    }
})

module.exports = router;
