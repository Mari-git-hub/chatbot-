import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { guardarMensaje, obtenerHistorial } from './chatService.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: messages,
    });

    const respuesta = completion.choices[0].message.content;
    const pregunta = messages[messages.length - 1].content;

    
    guardarMensaje(pregunta, respuesta);

    res.json({ reply: respuesta });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.get('/historial', (req, res) => {
  const historial = obtenerHistorial();
  res.json(historial);
});

app.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});
