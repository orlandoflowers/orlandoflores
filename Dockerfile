FROM node:18-alpine AS builder

WORKDIR /app

# Establecer variable de entorno para indicar que estamos en Fly.io
ENV FLY_APP_NAME=orlandoflores

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (usamos install en lugar de ci para permitir actualizaciones del package-lock.json)
RUN npm install

# Copiar código fuente
COPY . .

# Pre-optimizar imágenes con sharp (alternativa a vite-plugin-image-optimizer)
RUN npm install -g sharp-cli
RUN find public -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -exec sh -c 'sharp -i "$1" -o "${1%.png}.opt.png" --quality 70' sh {} \;
RUN find public -type f -name "*.opt.png" -exec sh -c 'mv "$1" "${1%.opt.png}.png"' sh {} \;

# Generar build
RUN npm run build

# Segunda etapa: solo los archivos estáticos
FROM nginx:alpine

# Copiar configuración de nginx personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de build desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto
EXPOSE 8080

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 