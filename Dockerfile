# Dockerfile for Infographic Screenshot Website
FROM node:18-alpine

# Install Chromium and dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont

# Tell Puppeteer to skip downloading Chrome and use the system-installed version.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy backend package.json and install dependencies
COPY backend/package.json ./backend/package.json
RUN cd backend && npm install --omit=dev

# Copy the rest of the application
COPY backend/server.js ./backend/
COPY frontend ./frontend
COPY .env* ./

EXPOSE 3000
CMD ["node", "backend/server.js"]
