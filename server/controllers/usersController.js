const User = require("../models/User")
const CryptoJS = require('crypto-js')


exports.update= async(req,res)=>{

    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password=CryptoJS.AES.encrypt(
                req.body.password,
                process.env.TOKEN_SECRET  
            ).toString();
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{
                new:true
            });
            res.status(200).json(updateUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json('You can only update your account')
    }};






exports.delete= async(req,res)=>{
    if( req.user.isAdmin){   
            try{
                 await User.findByIdAndDelete(req.params.id);
                 res.status(200).json('User has been deleted')
            }catch(err){
                res.status(500).json(err)
            }
    }else{
            res.status(403).json('You can only delete your account')
        }};
    


exports.get = async(req,res)=>{

        try{
            const user= await User.findById(req.params.id);
            const {password, ...info}=user._doc;
            res.status(200).json(info)
        }catch(err){
            res.status(500).json(err)
        }
    };
 



exports.getAll = async(req,res)=>{
    const query = req.query.new;
    if(req.user.isAdmin){   
            try{
                const users= query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
                res.status(200).json(users)
            }catch(err){
                res.status(500).json(err)
            }
    }else{
            res.status(403).json('Youre not allowed to view users ')
        }};
    



exports.stats= async(req,res)=>{
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear()-1);
    const monthsArray=["January","February","March","April","May","June","July","August","September","October","November","December"];


    try{
        const data = User.aggregate([
            {
                $project:{
                    month:{$month:"$createdAt"}
                }
            },{
              $group:{
                _id:"$month",
                total:{$sum:1}
              }  
            }
        
        ]);
            
        const result = await data.exec(); 

        res.status(200).json(result)
        
    }catch(err){
        res.status(500).json(err)
    }
}