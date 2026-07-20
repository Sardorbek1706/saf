import axios from 'axios';
import 'dotenv/config';

const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
const stream = true;

const API_KEY = process.env.NVAPI_KEY || process.env.NVAPI || null;

const headers = {
  "Accept": stream ? "text/event-stream" : "application/json"
};

if (API_KEY) {
  headers.Authorization = `Bearer ${API_KEY}`;
} else {
  console.warn('NVAPI_KEY not set; running in mock mode.');
}


const payload = {
  "model": "moonshotai/kimi-k2.5",
  "messages": [{"role":"user","content":""}],
  "max_tokens": 16384,
  "temperature": 1.00,
  "top_p": 1.00,
  "stream": stream,
  "chat_template_kwargs": {"thinking":true},
  
  
};

if (!API_KEY) {
  // Mock response when no API key is provided so the app can run locally.
  if (stream) {
    console.log('data: {"mock": true, "message": "This is a mock streaming chunk"}\n\n');
  } else {
    console.log(JSON.stringify({ mock: true, message: 'No API key provided. Running mock response.' }));
  }
} else {
  Promise.resolve(
    axios.post(invokeUrl, payload, {
      headers: headers,
      responseType: stream ? 'stream' : 'json'
    })
  )
    .then(response => {
      if (stream) {
        response.data.on('data', (chunk) => {
          console.log(chunk.toString());
        });
      } else {
        console.log(JSON.stringify(response.data));
      }
    })
    .catch(error => {
      console.error(error.toString());
    });
}