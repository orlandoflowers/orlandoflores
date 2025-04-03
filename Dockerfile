FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

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