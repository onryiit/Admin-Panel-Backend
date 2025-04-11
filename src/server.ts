import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import noteRoutes from './Routes/noteRoutes';
import loginRoutes from './Routes/loginRoutes';
import registerRoutes from './Routes/registerRoutes';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 🔗 MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager')
  .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch(err => console.error('❌ MongoDB bağlantı hatası:', err));

app.use(cors());
app.use(bodyParser.json());

app.use('/Note', noteRoutes);
app.use('/auth', loginRoutes);
app.use('/reg', registerRoutes);

app.listen(PORT, () => {
  console.log(`Backend ${PORT} portunda çalışıyor.`);
});
