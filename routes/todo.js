const todo = require("../model/todo.js")
const express = require("express")
const router = express.Router()
const moment=require("moment");

//set home page 
router.get("/",async (req,res,next)=>{
    try {
        const todolist = await todo.find({})
        res.locals.moment=moment
        // render the index.ejs 
        res.render("index.ejs",{title: "app",todolist:todolist});
    } catch (error) {
        res.status(500).json({
            message:error.message
        }).send("sorry")   
    }
})
//delete page
router.get("/delete",(req,res,next)=>{
    try {
        const {id}=req.query
        res.render("deletetodo.ejs",{title:"delete",id:id})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
})
//update page
router.get("/update",async(req,res,next)=>{
    try {
        const {id} = req.query
        const onetodo = await todo.findById(id);
        console.log(onetodo)
        res.render("uptadetodo.ejs",{title:"edit",todo:onetodo})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})
//add page 
router.get("/add",(req,res,next)=>{
    try {
        
        // render the index.ejs 
        res.render("newtodo.ejs",{title:"add"});
    } catch (error) {
        res.status(500).json({
            message:error.message
        }).send("sorry")  
    }
})
//add todo to te database 
router.post("/add",async(req,res,next)=>{
    try {
    
        const {titre , desc}=req.body
        console.log(titre)
        console.log(desc)
        const newtodo = new todo({title :titre ,desc :desc})
        await newtodo.save()
        res.redirect("/")

    } catch (error) {
        res.json({message:error.message})
    }
})
router.post("/update/:id",async(req,res,next)=>{
    try {
        const {id}=req.params
        const {titre , desc}=req.body
        console.log(titre)
        console.log(desc)
        const newtodo = await todo.findById(id)
        newtodo.title=titre
        newtodo.desc=desc
        await newtodo.save()
        res.redirect("/")

    } catch (error) {
        res.json({message:error.message})
    }
})
router.get("/confirme/:id",async(req,res,next)=>{
    const {id} =req.params
    await todo.findByIdAndDelete(id)
    res.redirect("/")

})
module.exports=router