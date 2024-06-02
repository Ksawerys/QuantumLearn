const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const fs = require('fs');
const path = require('path');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);


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

async function evaluateImage(req) {
  if (!req.files || !req.files.file) {
    throw new Error('No file uploaded.');
  }

  try {
    const file = req.files.file;
    const fileData = fs.readFileSync(file.tempFilePath);
    let base64 = Buffer.from(fileData).toString('base64');
    
    if (!base64.match(/^[a-zA-Z0-9+/]*={0,2}$/)) {
      throw new Error('Invalid base64 string.');
    }

    const prompt = "A detailed description of the image:dame una descripcion de mas de 400 caracteres si recibes una imagen y sino solo di que no has recibido nada";

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64}`
              }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    const description = response.choices[0].message.content;
    const isAdequate = description.length > 400;

    return isAdequate;
  } catch (error) {
    console.error("Error al conectar con la API de OpenAI:", error);
    throw new Error("Failed to process request");
  }
}


const createTrainingModel = async (req, res, next) => {
  const messages = req.body;

  try {
    console.log(req.body)
    console.log("Creating training file..."+messages);
    await writeFile("academic_advice_dataset.jsonl", messages.map(example => JSON.stringify(example)).join('\n'));
    const uploadResponse = await openai.files.create({
        file: fs.createReadStream("academic_advice_dataset.jsonl"),
        purpose: "fine-tune"
    });

    const fineTuningJob = await openai.fineTuning.jobs.create({
        training_file: uploadResponse.id,
        model: "gpt-3.5-turbo",
        suffix: "academic-advice"
    });

    res.json({
      uploadResponse,
      fineTuningJobId: fineTuningJob.id
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { generateText, evaluateImage, createTrainingModel };