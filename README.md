# Infographic Screenshot Website

![Infographic Screenshot Demo](infographic-screenshot%20(19).png)

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
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── package.json
│   └── README.md
├── .env.example
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
You can set the port in a `.env` file in the root or in `/backend`:
```
PORT=3000
```

## Docker (Optional)
To build and run with Docker:
```bash
docker build -t infographic-screenshot .
docker run -p 3000:3000 infographic-screenshot
```

## Free Deployment: Render.com

You can deploy this project for free using [Render](https://render.com):

1. **Push your code to GitHub** (if not already).
2. **Create a free account** at [https://render.com](https://render.com).
3. **Create a new Web Service**:
   - Connect your GitHub repo.
   - Set the root directory to your project folder.
   - Set the build command to:
     ```sh
     cd backend && npm install
     ```
   - Set the start command to:
     ```sh
     node backend/server.js
     ```
   - (Optional) Add an environment variable `PORT=10000` (or leave blank for default).
4. **Deploy**. Render will give you a public link (e.g., `https://your-app.onrender.com`).

Now anyone can access your app from that link!

---

**Other free options:** Railway.app, Cyclic.sh, or Glitch.com (all support Node.js apps with similar steps).

---

**Note:** Free plans may sleep after inactivity or have usage limits. For production, consider paid plans or a VPS.

## License
MIT
