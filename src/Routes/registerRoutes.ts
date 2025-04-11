
import express from "express";
import bcrypt from "bcryptjs";
import User from "../Models/User";

const router = express.Router();

router.post("/register", async (req:any, res:any) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: "Kayıt başarılı." });
});

export default router;