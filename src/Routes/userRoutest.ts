import User from "../Models/User";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
    try {
        const customer_id = req.query.customer_id
        const pk= `Users_${customer_id}`
        const user_id = Number(req.query.user_id)
        const customers = await User.findOne({pk:pk,user_id:user_id}); 
        res.status(200).json(customers);
    } catch (error) {
        console.error("User getirilirken hata:", error);
        res.status(500).json({ message: 'User getirilirken sunucu hatası oluştu.' });
    }
});

export default userRoutes;