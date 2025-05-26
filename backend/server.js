const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Screenshot endpoint
app.post('/screenshot', async (req, res) => {
    console.log('Received /screenshot request');
    console.log('Memory usage at start:', process.memoryUsage());
    let browser;
    // Set a timeout for Puppeteer (e.g., 20 seconds)
    const timeoutMs = 20000;
    let timeoutHandle;
    let timedOut = false;
    try {
        const timeoutPromise = new Promise((_, reject) => {
            timeoutHandle = setTimeout(() => {
                timedOut = true;
                reject(new Error('Screenshot operation timed out.'));
            }, timeoutMs);
        });
        const screenshotPromise = (async () => {
            console.log('Launching Puppeteer...');
            browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
            });
            console.log('Puppeteer launched. Opening new page...');
            const page = await browser.newPage();
            // Workaround for Puppeteer 'Requesting main frame too early!' error on Render
            await new Promise(r => setTimeout(r, 500));
            const isProduction = process.env.RENDER === 'true' || process.env.RENDER_EXTERNAL_URL;
            const actualPort = process.env.PORT || PORT || 3000;
            const targetUrl = isProduction
                ? (process.env.RENDER_EXTERNAL_URL || 'https://infographic-screenshot-task-1.onrender.com/')
                : `http://localhost:${actualPort}/`;
            console.log('Puppeteer navigating to:', targetUrl);
            try {
                await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 15000 });
                console.log('Navigation successful. Taking screenshot...');
            } catch (navErr) {
                console.error('Puppeteer navigation error:', navErr);
                throw new Error('Failed to load target page for screenshot.');
            }
            const screenshot = await page.screenshot({ fullPage: true, type: 'png' });
            console.log('Screenshot taken.');
            return screenshot;
        })();
        const screenshot = await Promise.race([screenshotPromise, timeoutPromise]);
        clearTimeout(timeoutHandle);
        res.set({
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="infographic-screenshot.png"'
        });
        res.send(screenshot);
    } catch (err) {
        clearTimeout(timeoutHandle);
        if (timedOut) {
            console.error('Screenshot error: Operation timed out.');
            res.status(504).send('Screenshot operation timed out.');
        } else {
            console.error('Screenshot error:', err); // Log the real error
            if (err && err.stack) {
                console.error('Stack trace:', err.stack); // Print stack trace for debugging
            }
            res.status(500).send('Screenshot failed.');
        }
    } finally {
        if (browser) {
            console.log('Closing Puppeteer browser...');
            await browser.close();
            console.log('Puppeteer browser closed.');
        }
        console.log('Memory usage at end:', process.memoryUsage());
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
