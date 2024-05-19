const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const fs = require('fs');
const path = require('path');

async function generateText(req, res) {
  const prompt = req.body.text;
  if (!prompt) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });

      res.json({ generated_text: response.choices[0].message.content});
      
    } catch (error) {
    console.error("Error al conectar con la API de OpenAI:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

async function evaluateImage(req, res) {
    if (!req.files || !req.files.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    try {
      const file = req.files.file;
      const base64 = Buffer.from(file.data).toString('base64');
      const prompt = `A detailed description of the image: ${base64}`+ " dame una descripcion de mas de 400 caracteres";
  
      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4",
      });
  
      res.json({ response:response.choices[0].message.content });
    } catch (error) {
      console.error("Error al conectar con la API de OpenAI:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  }

module.exports = { generateText, evaluateImage };