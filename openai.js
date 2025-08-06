require('dotenv').config(); // Load .env variables

class OpenAIAPI {
    static async generateResponse(userMessage, conversationHistory = []) {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            console.error("Error: OpenAI API key not found in .env file.");
            return "API key not configured.";
        }

        const endpoint = 'https://api.openai.com/v1/chat/completions';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4.1", // Upgraded model
                    messages: conversationHistory.concat([{ role: 'user', content: userMessage }]),
                    max_tokens: 200 // Increased for better responses
                }),
            });

            const responseData = await response.json();

            // Handle OpenAI API errors
            if (responseData.error) {
                console.error("OpenAI API Error:", responseData.error.message);
                return `Error: ${responseData.error.message}`;
            }

            // Return chatbot reply if valid
            if (responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message) {
                return responseData.choices[0].message.content;
            } else {
                console.error('Error: No valid response from OpenAI API');
                return 'Sorry, I couldn\'t understand that.';
            }
        } catch (err) {
            console.error("Fetch error:", err);
            return "Error contacting OpenAI API.";
        }
    }
}

module.exports = { OpenAIAPI };
