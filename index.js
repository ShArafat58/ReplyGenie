require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

// Test route
app.get("/", (req, res) => {
    res.send("ReplyGenie is running ✅");
});

// Webhook verification
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
        console.log("Webhook verified ✅");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Verify token loaded:", process.env.VERIFY_TOKEN);
});