require('dotenv').config(); // Load .env variables

const express = require('express');
const path = require('path');
const { OpenAIAPI } = require('./openai');

const app = express();
const port = process.env.PORT || 3000;

// In-memory store for conversation histories (keyed by sessionId or IP)
const conversationHistories = {};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/**
 * Routes
 */

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for chatbot
app.post('/getChatbotResponse', async (req, res) => {
    try {
        const { userMessage, sessionId } = req.body;

        if (!userMessage || typeof userMessage !== 'string') {
            return res.status(400).json({ error: "Invalid input" });
        }

        // Use sessionId (or fallback to IP) to track conversation
        const key = sessionId || req.ip;

        // Initialize conversation history if not present
        if (!conversationHistories[key]) {
            conversationHistories[key] = [];
        }

        // Retrieve existing conversation history
        const conversationHistory = conversationHistories[key];

        // Generate response using OpenAI API
        const chatbotResponse = await OpenAIAPI.generateResponse(userMessage, conversationHistory);

        // Update conversation history
        conversationHistory.push({ role: 'user', content: userMessage });
        conversationHistory.push({ role: 'assistant', content: chatbotResponse });

        // Limit history size to prevent memory overflow (last 20 messages)
        if (conversationHistory.length > 20) {
            conversationHistories[key] = conversationHistory.slice(-20);
        }

        // Send back response
        res.json({ chatbotResponse });
    } catch (error) {
        console.error("Error in /getChatbotResponse:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
