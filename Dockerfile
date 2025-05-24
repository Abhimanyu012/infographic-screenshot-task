# Dockerfile for Infographic Screenshot Website
FROM node:18-alpine
WORKDIR /app
COPY backend/package.json ./backend/
RUN cd backend && npm install --production || npm install --legacy-peer-deps --production
COPY backend/server.js ./backend/
COPY frontend ./frontend
COPY .env* ./
EXPOSE 3000
CMD ["node", "backend/server.js"]
