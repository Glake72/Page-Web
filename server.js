const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Mets ta clé API ici (ne jamais la mettre dans le JS du navigateur)
const OPENAI_API_KEY = "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";

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Tu es un assistant utile et sympa." },
                    { role: "user", content: message }
                ]
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.listen(PORT, () => console.log(`Serveur local sur http://localhost:${PORT}`));