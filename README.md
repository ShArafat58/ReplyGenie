# ReplyGenie

ReplyGenie is a Facebook Messenger chatbot that automatically replies to messages sent to a Facebook Page. It is built with Node.js and Express, and it uses the Meta Messenger Platform API to receive and send messages.

## What it does

When a customer sends a message to the connected Facebook Page, ReplyGenie receives that message through a webhook and sends an automatic reply back to the customer. This removes the need to answer every message by hand.

## How it works

The flow has three simple parts:

1. A customer sends a message to the Facebook Page.
2. Facebook forwards that message to the app through a webhook (a public URL the app registers with Facebook).
3. The app reads who sent the message and what they wrote, then uses the Send API to reply.

Together these steps form a basic chatbot loop: receive a message, then send a reply.

## Tech stack

- Node.js
- Express
- Axios (to call the Meta Graph API)
- dotenv (to keep secret tokens out of the code)
- ngrok (to expose the local server to the internet during testing)

## Project structure

ReplyGenie/
├── index.js Main server (webhook verify, receive, and reply)
├── subscribe.js One time script to subscribe the Page to the app
├── .env Secret tokens (not committed to GitHub)
├── .gitignore
├── package.json
└── README.md


## Prerequisites

- A Facebook account, a Facebook Page, and a Meta developer account
- Node.js installed
- ngrok installed

## Setup

1. Clone the repository and install dependencies:

git clone https://github.com/ShArafat58/ReplyGenie.git
cd ReplyGenie
npm install


2. Create a `.env` file in the root and add your values:

VERIFY_TOKEN=your_verify_token
PAGE_ACCESS_TOKEN=your_page_access_token


3. Start the server:

node index.js


4. In a second terminal, expose the server with ngrok:

ngrok http 3000


5. In the Meta App dashboard, set the webhook Callback URL to your ngrok link plus `/webhook`, use the same verify token, and subscribe to the `messages` field.

6. Run the subscribe script once to link the Page to the app:

node subscribe.js


## Testing

Send a message to your Page from the Facebook account that owns the app. You should see the message appear in the server terminal and receive an automatic reply in Messenger.

## Note on app mode

The app runs in development mode, so only people with a role on the app (admin, developer, or tester) will get replies. To make it work for everyone, the app needs to pass Meta App Review.

## Author

Built by Shahriar Hossain Arafat as a learning project on the Meta Messenger Platform API.
