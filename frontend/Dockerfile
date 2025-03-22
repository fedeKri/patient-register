# Usa una imagen oficial de Node.js basada en Alpine
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias y el lockfile (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto en el que Vite levanta la aplicación (por defecto, 5173)
EXPOSE 5173

# Comando para iniciar la aplicación en modo desarrollo
# ...
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

