import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/generate-response', async (req, res) => {
  try {
    const { resolution } = req.body;

    if (!resolution) {
      return res.status(400).json({ error: 'Resolution is required' });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a darkly humorous, sardonic critic who specializes in predicting why people's New Year's resolutions will fail. Your responses should be witty, clever, and amusing while pointing out human nature's flaws and society's absurdities. Keep responses concise (2-3 sentences) and entertainingly pessimistic."
        },
        {
          role: "user",
          content: `My New Year's resolution is: ${resolution}`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return res.status(500).json({ error: 'No response generated' });
    }

    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});