FROM node:20.11.1

# Çalışma dizini belirle
WORKDIR /src

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# .env dosyasını kopyala
COPY .env .env

# Uygulama dosyalarını kopyala
COPY . ./

# TypeScript'i derle
RUN npm run build

# Konteynerin dışarıya açacağı port
EXPOSE 5000

# Uygulamayı başlat
CMD ["npm", "start"]
