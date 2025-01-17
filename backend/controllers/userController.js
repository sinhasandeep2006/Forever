import validator from 'validator'
import userModel from './../models/usermodel.js';
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const createToken =(id)=>{
    return JWT.sign({id},process.env.JWT_SECRET)
}



//Route for user login
const loginUser =async(req,res)=>{
    try{
    const  { email, password } = req.body; 
    const user =await userModel.findOne({email})
    if(!user){
        return res.json({success:false,message:"user is not present"})
    }
    const isMatch =await bcrypt.compare(password,user.password)
    if(isMatch){
        const token =createToken(user._id)
        res.json({success:true,token})
    }else{
        res.json({success:false,message:"Invalid"})
    }}catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    
    }
}

//Route for user Register
const registerUser =async(req,res)=>{
    try {
        const { name, email, password } = req.body; 
        // check the user exsts or not
        const exists= await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"user is peresent"})
        }

        // validatinig email formate & strong passsword

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid one"})
        }
       

        if(password.length<8){
            return res.json({success:false,message:"please enter a Strong password"})
        }
        //hashing user password 
        const salt =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user=await newUser.save()
        //token

        const token =createToken(user._id)
        res.json({
            success:true,
           token 
        })

     
        }

     catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }

} 
//Route for admin login
const adminLogin =async(req,res)=>{
    try {
        const {email,password} =req.body
        if(email === process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token =JWT.sign(email+password ,process.env.JWT_SECRET)
            res.json({success:true ,token})
        }else{
            res.status(404).json({
                success:false,message:error.message
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
} 
export {loginUser,registerUser,adminLogin}