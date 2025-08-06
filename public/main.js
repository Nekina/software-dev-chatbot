const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

// Generate or retrieve a persistent session ID
const sessionId = localStorage.getItem('chatSession') || crypto.randomUUID();
localStorage.setItem('chatSession', sessionId);

// Send message on button click
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    displayMessage('user', message);
    getChatbotResponse(message);

    userInput.value = '';
}

// Send message on Enter key press
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

// Display message with styled bubbles
function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const messageParagraph = document.createElement('p');
    messageParagraph.innerText = message;

    messageElement.appendChild(messageParagraph);
    chatLog.appendChild(messageElement);

    // Smooth auto-scroll
    chatLog.scrollTo({
        top: chatLog.scrollHeight,
        behavior: 'smooth'
    });
}

// Fetch chatbot response
function getChatbotResponse(userMessage) {
    fetch('/getChatbotResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, sessionId }),
    })
    .then(response => response.json())
    .then(data => {
        displayMessage('chatbot', data.chatbotResponse);
    })
    .catch(error => console.error('Error:', error));
}
