//Local 

// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import noteRoutes from './Routes/noteRoutes';
// import loginRoutes from './Routes/loginRoutes';
// import registerRoutes from './Routes/registerRoutes';
// import dotenv from 'dotenv';
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // 🔗 MongoDB connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/admin-panel')
//   .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
//   .catch(err => console.error('❌ MongoDB bağlantı hatası:', err));

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/Note', noteRoutes);
// app.use('/auth', loginRoutes);
// app.use('/reg', registerRoutes);

// app.listen(PORT, () => {
//   console.log(`Backend ${PORT} portunda çalışıyor.`);
// });

// use for cloud
import express from 'express';
import cors from 'cors'; // CORS middleware'i import ediliyor
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import noteRoutes from './Routes/noteRoutes';
import loginRoutes from './Routes/loginRoutes';
import registerRoutes from './Routes/registerRoutes';
import dotenv from 'dotenv';
import customerRoutes from './Routes/customerRoutes';
import userRoutes from './Routes/userRoutest';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; // Render gibi platformlar PORT'u kendi belirleyebilir

// ----- CORS Ayarları Başlangıcı -----

// İzin vermek istediğiniz frontend URL'si
// KENDİ GITHUB PAGES URL'NİZLE DEĞİŞTİRİN!
const frontendURL = 'https://onryiit.github.io';

// CORS seçenekleri objesi
const corsOptions = {
  origin: function (origin, callback) {
    // Eğer istek gönderen bir origin belirtmemişse (örn: Postman, curl) izin ver
    // veya origin izin verilenler listesindeyse izin ver.
    if (!origin || frontendURL.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
      // Not: Geliştirme kolaylığı için localhost'a da izin ekledik.
      // Canlıda sadece frontendURL yeterli olabilir.
      callback(null, true);
    } else {
      callback(new Error('Bu kaynağın CORS politikası tarafından erişimine izin verilmiyor.'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // İzin verilen HTTP metodları
  credentials: true, // Eğer frontend'den cookie veya Authorization header gönderiyorsanız gerekebilir
  optionsSuccessStatus: 204 // Bazı eski tarayıcılar için
};

// CORS middleware'ini seçeneklerle birlikte kullan
app.use(cors(corsOptions));

// ----- CORS Ayarları Sonu -----


// 🔗 MongoDB connection
// Render'da MONGODB_URI ortam değişkenini ayarladığınızdan emin olun!
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ HATA: MONGODB_URI ortam değişkeni ayarlanmamış!');
  process.exit(1); // Uygulamayı durdur
}
mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch(err => console.error('❌ MongoDB bağlantı hatası:', err));


app.use(bodyParser.json());

app.use('/Note', noteRoutes);
app.use('/auth', loginRoutes);
app.use('/reg', registerRoutes);
app.use('/customer', customerRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('API Çalışıyor!');
});

app.listen(PORT, () => {
  console.log(`Backend ${PORT} portunda çalışıyor.`);
});