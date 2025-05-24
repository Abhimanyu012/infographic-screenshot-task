# Infographic Screenshot Website

A responsive, single-page infographic layout built with HTML, CSS, and vanilla JavaScript (frontend) and a Node.js + Express backend with Puppeteer to capture a screenshot of the infographic as an image.

## Features
- Responsive infographic layout (zigzag, 7 sections)
- "Take Screenshot" button with visual blink effect
- Screenshot endpoint using Puppeteer
- Easy to run locally or containerize with Docker

## Folder Structure
```
infographic-screenshot-task/
├── backend/
│   ├── server.js
│   ├── package.json
├── frontend/
│   ├── index.html
│   └── style.css
├── .env.example
├── .env (optional)
├── .gitignore
├── Dockerfile
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
cd backend
npm install
```

### Running the App
```bash
npm start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Screenshot Feature
Click the **Take Screenshot** button at the bottom of the page. The server will generate and download a PNG screenshot of the infographic.

## Environment Variables
You can set the port in a `.env` file in the root:
```
PORT=3000
```

## Docker (Optional)
To build and run with Docker:
```bash
docker build -t infographic-screenshot .
docker run -p 3000:3000 infographic-screenshot
```

## License
MIT
