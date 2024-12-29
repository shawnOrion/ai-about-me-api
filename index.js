const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { ElevenLabsClient } = require('elevenlabs');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize ElevenLabs client
const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// Debugging utility
const logDebug = (message, data) => {
  console.log(`[DEBUG] ${message}`, data || '');
};

// Route to create speech
app.post('/create-speech', async (req, res) => {
  try {
    const { text, voiceId, modelId } = req.body;

    // Validate input
    if (!text || !voiceId) {
      const errorMsg = 'Text and voiceId are required.';
      logDebug('Request validation failed', { error: errorMsg });
      return res.status(400).json({ error: errorMsg });
    }

    // Construct API parameters
    const apiEndpoint = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const payload = {
      text,
      model_id: modelId || 'eleven_multilingual_v2',
      output_format: 'mp3_44100_128',
    };

    logDebug('Sending API request', { endpoint: apiEndpoint, payload });

    // Make API request
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorMsg = `API call failed with status ${response.status}`;
      logDebug('API response error', { status: response.status, statusText: response.statusText });
      return res.status(response.status).json({ error: errorMsg });
    }

    const audioBuffer = await response.arrayBuffer();

    logDebug('Received API response', { size: audioBuffer.byteLength });

    // Send audio buffer as response
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.byteLength,
    });
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    // Log error details
    logDebug('Error generating speech', { error: error.message });
    res.status(500).json({ error: 'Failed to generate speech.' });
  }
});


// Start server
app.listen(PORT, () => {
  logDebug('Server started', { port: PORT });
});
