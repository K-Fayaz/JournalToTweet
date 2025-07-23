# Multi-stage build
FROM node:18-alpine as client-build

# Build the client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci

COPY client/ ./

# Fix permissions for node_modules/.bin
RUN chmod -R 755 node_modules/.bin

RUN npm run build

# Server stage
FROM node:18-alpine

WORKDIR /app

# Copy server files
COPY server/package*.json ./
RUN npm ci --only=production

COPY server/ ./

# Copy built client files to server's public/static directory
COPY --from=client-build /app/client/dist ./public

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]