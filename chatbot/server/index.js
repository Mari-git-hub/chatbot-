import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "La variable debe ser un arreglo con al menos 1 mensaje" });
        }

        const safeMessages = messages
            .filter(m => m.role && m.content)
            .slice(-20)
            .map(m => ({ role: m.role, content: m.content }));

        const response = await client.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
                { role: "system", content: "Eres un asistente de chatbot que responde con claridad y precisión." },
                ...safeMessages
            ]
        });

        return res.json({ reply: response.choices[0].message.content });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
