# Dockerfile for Infographic Screenshot Website
FROM node:18-alpine
WORKDIR /app
COPY backend/package.json ./backend/
RUN cd backend && npm install --omit=dev || npm install --legacy-peer-deps --omit=dev
COPY backend/server.js ./backend/
COPY frontend ./frontend
COPY .env* ./
EXPOSE 3000
CMD ["node", "backend/server.js"]
