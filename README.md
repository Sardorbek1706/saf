# Taklifnoma

Simple Node script that posts to NVIDIA Integrate Chat completions API.

Quick start

1. Copy `.env.example` to `.env` and set your `NVAPI_KEY`.

2. Install dependencies:

```bash
npm install
```

3. Run (mock mode used when no key set):

```bash
npm start
# or
npm run dev
```

Windows PowerShell example to run with an env var without a .env file:

```powershell
$env:NVAPI_KEY="your_real_key_here"
npm start
```
