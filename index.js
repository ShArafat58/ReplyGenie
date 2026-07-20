require("dotenv").config();
const axios = require("axios");
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

// Receive messages
app.post("/webhook", (req, res) => {
    const body = req.body;

    if (body.object === "page") {
        body.entry.forEach((entry) => {
            const event = entry.messaging[0];
            const senderPSID = event.sender.id;

            if (event.message && event.message.text) {
                console.log(`Message from ${senderPSID}: ${event.message.text}`);
                sendMessage(senderPSID, "Thanks for your message! We will reply soon 😊");
            }
        });

        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.sendStatus(404);
    }
});

// Send a reply to the customer
async function sendMessage(senderPSID, text) {
    try {
        await axios.post(
            `https://graph.facebook.com/v21.0/me/messages`,
            {
                recipient: { id: senderPSID },
                messaging_type: "RESPONSE",
                message: { text: text },
            },
            {
                params: { access_token: process.env.PAGE_ACCESS_TOKEN },
            }
        );
        console.log("Reply sent ✅");
    } catch (error) {
        console.error("Error sending reply:", error.response?.data || error.message);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Verify token loaded:", process.env.VERIFY_TOKEN);
});