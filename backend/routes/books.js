const express= require('express');
const router = express.Router();

const Book = require('../models/Book');
const protect = require('../middleware/auth')

router.get('/',protect,async(req,res)=>{
    try{
const books = await Book.find();
res.json(books);
    }catch(error){
res.json({message:"error"})
    
    
}})

router.delete('/:id',protect,async (req,res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({"message":"sucessfully deleted"})
} catch (error) {
        res.json({ message:error.message})
    }
})

router.post('/',protect,async(req,res)=>{
    try{
const book = new Book(req.body);
const savebook= await book.save();
res.json(savebook)

    }catch(error){
        res.json({message:error.message})
    }
    
})
 
router.put('/:id',protect,async(req,res)=>{
    try {
            const updatedbook = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updatedbook)
        
    } catch (error) {
        res.json({message:error.message })
    }

})

module.exports= router;


