# Multi-stage Dockerfile to build and serve Syncmotic (Vite + React)

# 1) Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app (including .env with VITE_ variables)
COPY . .

# Build the production assets
RUN npm run build

# 2) Runtime stage (static files served by Nginx)
FROM nginx:alpine AS runner

# Copy build output to Nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose default HTTP port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
