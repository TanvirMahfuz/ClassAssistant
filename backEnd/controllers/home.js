
const path = require('path');
const home = async(req,res)=>{
    file=path.join(__dirname,"../frontEnd/index.js");
    res.status(200).sendFile(file);
}

module.exports={home};