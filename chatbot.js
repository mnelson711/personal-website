// script.js

const chatbotContainer = document.getElementById("chatbot-container");
const apiKey = "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";


function appendMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatbotContainer.appendChild(messageElement);
}

function sendMessageToChatbot(userMessage) {
    // Make a request to the OpenAI API
    // Implement the logic to send userMessage and receive a response

    // Example request (replace with actual API call)
    const request = {
        model: 'text-davinci-003',
        prompt: userMessage,
        api_key: apiKey,
    };

    // Use fetch or another HTTP library to send the request
    // Update the logic based on the OpenAI API documentation
    fetch(
      "http://localhost:8080/https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(request),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const chatbotResponse = data.choices[0].text;
        appendMessage("Chatbot", chatbotResponse);
      })
      .catch((error) => appendMessage("Chatbot", "No connection found."));
}

// Function to handle user input
function handleUserInput() {
    const userInputField = document.getElementById('user-input');
    const userMessage = userInputField.value;

    if (userMessage.trim() !== '') {
        appendMessage('User', userMessage);
        sendMessageToChatbot(userMessage);

        // Clear the input field after sending the message
        userInputField.value = '';
    }
}

// Example usage
sendMessageToChatbot('Hello! How can I help you today?');
