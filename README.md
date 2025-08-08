# Software Dev Chatbot

An interactive, server-rendered chatbot built with Node.js and the OpenAI API—designed for providing AI-powered responses via a lightweight web interface.

## Features

- Leverages OpenAI’s GPT models for conversational AI  
- Server-side rendering ensures fast and SEO-friendly loading  
- Clear and minimal Node.js backend structure  
- Secure handling of API credentials using environment variables  
- Easy to extend—add your own styling, input validation, or integrations

## Tech Stack

- **Node.js** – JavaScript runtime for backend logic  
- **Express.js** – Routing and server-side rendering framework  
- **OpenAI API** – For powering intelligent chatbot responses  
- **HTML/CSS** – Frontend markup and styling  
- **dotenv** (during setup) – For secure environment variable management

## Installation and Setup

1. Clone the repository:  
   ```bash
   git clone https://github.com/Nekina/software-dev-chatbot.git
   cd software-dev-chatbot
2. Install dependencies:
   ```bash
   npm install
3. Set up environment variables by creating a .env file in the project root, and include:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000    # or your preferred port
4. Start the server:
   ```bash
   npm start
   ```
   or, if a development script is available (e.g., with live reload):
   ```bash
   npm run dev
5. Open your browser and visit http://localhost:3000 to begin chatting with the bot.
