import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel.js";



export const register = async(req,res) =>{

    try{

        const {name,email,password} = req.body 

        // validation

        if(!email || !password){
            return res.status(400).json({
                message:"Email ans password are required"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message:"Password must be at least 6 characters"
            })
        }

        // check if user already exists

        const existingUser = await findUserByEmail(email)
        if(existingUser){
            return res.status(400).json({
                message:"User already exisits with this email"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password,10)

        // Create user in databse

        const userId  = await createUser(name,email,hashedPassword)

        res.status(201).json({
            message:"User registered successfully",
            userId
        })



    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server error during registration"
        })
    }
}


export const login = async (req,res) =>{
    try{

        const {email,password} = req.body
        
        // validation
        if(!email || !password){
            return res.status(400).json({
                message:"Email ans password are required"
            })
        }

        const user = await findUserByEmail(email)
        
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }   

        //check password 

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                message:'invalid email or password'
            })
        }

        // Generate JWT token

        const token = jwt.sign(
            {
                id:user.id,
                email:user.email
            },
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        );

        // send response 

        res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        });
    
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server error during login"
        })
    }
}