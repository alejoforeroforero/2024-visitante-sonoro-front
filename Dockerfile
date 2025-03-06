# syntax=docker.io/docker/dockerfile:1

# Base stage for shared settings
FROM node:20.5.0-alpine3.18 AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci --no-audit --no-fund && \
    npm cache clean --force

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && \
    find dist -name "*.map" -delete

# Runner stage
FROM nginx:alpine AS runner
RUN apk add --no-cache dumb-init && \
    mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx && \
    # Remove default nginx pid path from nginx.conf
    sed -i '/pid/d' /etc/nginx/nginx.conf && \
    # Create pid directory and set permissions
    mkdir -p /tmp/nginx && \
    chown -R nginx:nginx /tmp/nginx && \
    # Update nginx configuration to use the new pid path
    echo "pid /tmp/nginx/nginx.pid;" >> /etc/nginx/nginx.conf

# Copy custom nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
# Copy built files
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

USER nginx
EXPOSE 80

ENTRYPOINT ["dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]


