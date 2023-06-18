const User = require("../models/User")
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.TOKEN_SECRET).toString()
    })
    try{
        const user = await newUser.save();
        return res.status(200).send(user);
    }
    catch(err){
        res.status(500).json(err)
    }

}


exports.login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json('Wrong password or username');
      }
  
      const decrypted = CryptoJS.AES.decrypt(
        user.password,
        process.env.TOKEN_SECRET
      );
      const originalPassword = decrypted.toString(CryptoJS.enc.Utf8);
  
      if (originalPassword !== req.body.password) {
        return res.status(401).json('Wrong Password');
      }

      const accessToken = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.TOKEN_SECRET,{expiresIn:"5d"})

      const {password, ...info}=user._doc;
  
      res.status(200).json({...info,accessToken});

    } catch (err) {
      res.status(500).json(err);
    }
  };
  