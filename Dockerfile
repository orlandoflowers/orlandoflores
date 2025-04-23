FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Generar build
RUN npm run build

# Segunda etapa: solo los archivos estáticos
FROM nginx:alpine

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto
EXPOSE 8080

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 