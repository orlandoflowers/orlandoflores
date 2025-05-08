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

# Crear directorio para templates
RUN mkdir -p /etc/nginx/templates

# Copiar configuración de nginx template
COPY nginx.template.conf /etc/nginx/templates/

# Copiar script de inicio
COPY start.sh /docker-entrypoint.d/40-start.sh
RUN chmod +x /docker-entrypoint.d/40-start.sh

# Copiar archivos de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto dinámico
ENV PORT=8080
EXPOSE ${PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/ || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 