# HireWise - Job-Resume Matching

HireWise is a resume-to-job matching application with:

- semantic skill matching
- weighted readiness scoring
- deterministic explanations of matched and missing skills
- a multi-page frontend flow (Landing -> Learn More -> Analyzer)

## Current Frontend Pages

- `/` : Landing page
- `/learn-more` : Detailed workflow, how it works, and readiness score formula (rendered with KaTeX)
- `/analyze` : Resume upload + job description analysis page

## Tech Stack

- Backend: FastAPI
- Frontend: Next.js (App Router, TypeScript)
- Formula rendering on Learn More page: KaTeX (`katex` + `react-katex`)

## Run Locally

### 1. Start Backend (FastAPI)

```bash
cd backend
python -m venv .venv
```

Activate virtual environment:

- PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

- macOS/Linux:

```bash
source .venv/bin/activate
```

Install backend dependencies and run:

```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend API docs: `http://localhost:8000/docs`

### 2. Start Frontend (Next.js)

```bash
cd frontend
```

Copy environment file:

- PowerShell:

```powershell
Copy-Item .env.example .env.local
```

- macOS/Linux:

```bash
cp .env.example .env.local
```

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Install frontend dependencies and run:

```bash
npm install
npm run dev
```

Frontend app: `http://localhost:3000`

## Notes

- If PowerShell blocks venv activation, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

- After cleaning generated files (`__pycache__`, `.next`, etc.), run installs/build again as needed.