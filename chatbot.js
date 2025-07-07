const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

// Clé API OpenAI (⚠️ ne JAMAIS mettre cette clé ici en public !)
const OPENAI_API_KEY = "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";  // Remplace par ta vraie clé
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = userInput.value;
    if (!message) return;

    appendMessage("Toi", message);
    userInput.value = "";

    appendMessage("Chatbot", "Réflexion...");

    try {
        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content.trim();

        updateLastBotMessage(reply);

    } catch (error) {
        updateLastBotMessage("Erreur de réponse !");
        console.error(error);
    }
});

function appendMessage(sender, message) {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${sender} :</strong> ${message}`;
    chatLog.appendChild(p);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function updateLastBotMessage(newText) {
    const messages = chatLog.querySelectorAll("p");
    const last = messages[messages.length - 1];
    if (last && last.innerHTML.includes("Chatbot")) {
        last.innerHTML = `<strong>Chatbot :</strong> ${newText}`;
    }
}