// Get the user input element and send button
const userInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');

// Get the chat window element
const chatWindow = document.getElementById('chat-window');

// Set up the GPT-3 API credentials
const apiKey = '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';
const baseUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Handle user input
function handleUserInput() {
  const message = userInput.value.trim();
  if (!message) {
    return;
  }

  // Display the user message in the chat window
  displayMessage(message, 'user');

  // Call the GPT-3 API to generate a response
  generateResponse(message);
}

// Display a message in the chat window
function displayMessage(message, sender) {
  const div = document.createElement('div');
  div.classList.add(sender);
  div.innerHTML = message;
  chatWindow.appendChild(div);
}

// Generate a response using the GPT-3 API
async function generateResponse(message) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Conversation with ChatGPT:\nUser: ${message}\nChatGPT:`,
        max_tokens: 50,
        temperature: 0.7,
        n: 1,
        stop: ['\n'],
      }),
    });
    const result = await response.json();
    const responseText = result.choices[0].text.trim();
    displayMessage(responseText, 'chatgpt');
  } catch (error) {
    console.error(error);
  }
}

// Add event listener for the send button
sendButton.addEventListener('click', handleUserInput);

// Add event listener for the enter key
userInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    handleUserInput();
  }
});
