# Utiliza una imagen base de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación a la imagen del contenedor
COPY package.json package-lock.json /app/

# Instala las dependencias de la aplicación
RUN npm install

# Copia el código fuente de la aplicación a la imagen del contenedor
COPY . /app

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación (puedes cambiar el puerto si es necesario)
EXPOSE 3000

# Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD ["npm", "start"]