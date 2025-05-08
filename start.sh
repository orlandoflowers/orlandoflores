#!/bin/sh

# Set default port if not provided
export PORT=${PORT:-8080}

# Replace environment variables in nginx template
envsubst '${PORT}' < /etc/nginx/templates/nginx.template.conf > /etc/nginx/conf.d/default.conf

# Start nginx
nginx -g 'daemon off;' 