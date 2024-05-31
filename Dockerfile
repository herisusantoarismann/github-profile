# Gunakan image node sebagai base image untuk build tahap pertama
FROM node:18-alpine AS build

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json ke dalam container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode aplikasi ke dalam container
COPY . .

# Build aplikasi menggunakan Vite
RUN npm run build

# Gunakan image nginx sebagai base image untuk tahap produksi
FROM nginx:alpine

# Copy build output dari tahap build ke direktori nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Ekspose port 80 untuk mengakses aplikasi
EXPOSE 80

# Jalankan nginx
CMD ["nginx", "-g", "daemon off;"]
