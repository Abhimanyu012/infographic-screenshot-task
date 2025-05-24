const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Screenshot endpoint
app.post('/screenshot', async (req, res) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
        const screenshot = await page.screenshot({ fullPage: true, type: 'png' });
        res.set({
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="infographic-screenshot.png"'
        });
        res.send(screenshot);
    } catch (err) {
        res.status(500).send('Screenshot failed.');
    } finally {
        if (browser) await browser.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
