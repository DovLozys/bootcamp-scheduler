# syntax=docker/dockerfile:1
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
ENV NODE_ENV=production
RUN npm ci --only=production

# Copy app source
COPY . .

# Use a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["npm", "start"]
