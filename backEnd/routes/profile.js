const express = require('express');
const router = express.Router();
const path=require("path");


const profile=path.join(__dirname,"../../frontEnd/profile.html");

//const {home} = require'../controllers/home');
router.get('/', async(req,res)=>{
    console.log("control in profile");
    res.status(200).sendFile(profile);
});
module.exports=router;

//project make over