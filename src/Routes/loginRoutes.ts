import User from "../Models/User";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// This API is login for user
router.post("/login", async (req:any, res:any) => {
    let email= req.body.email;
    let password= req.body.password;
  
    try {
      const user = await User.findOne({ email });
      // console.log('Kullanıcı:', user);
    
      if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı." });
    
      const isMatch = await bcrypt.compare(password, user.password);
      // console.log(isMatch)
      if (!isMatch) return res.status(400).json({ message: "Şifre yanlış." });
    
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });
      console.log(token)
    
      res.json({ token:token,user_id:user.user_id,customer_id:user.customer_id });
    } catch (err) {
      console.error('Giriş hatası:', err);
      res.status(500).json({ message: "Sunucu hatası." });
    }
  });

export default router;