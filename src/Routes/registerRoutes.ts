
import express from "express";
import bcrypt from "bcryptjs";
import User from "../Models/User";
import moment from "moment";

const router = express.Router();

router.post("/register", async (req:any, res:any) => {
  const { email, password,customer_id } = req.body;
  const user_id = moment().unix()* 1000
  const pk = `Users_${customer_id}`

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ pk:pk,email, password: hashedPassword ,customer_id,user_id});
  await user.save();

  res.status(201).json({ message: "Kayıt başarılı." });
});

export default router;