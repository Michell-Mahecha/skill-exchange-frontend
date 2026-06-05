# Skill Exchange Frontend

This is the Next.js frontend application for the **Skill Exchange** platform. It integrates with the Django REST Framework backend to provide a learning and mentorship workspace, featuring a real-time community chat powered by Firebase and an AI assistant powered by Google Gemini.

## Getting Started

Follow these steps to get the frontend up and running locally:

### 1. Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** / **pnpm** / **bun**

### 2. Configure Environment Variables
Copy the template environment file to create your local environment configuration:
```bash
cp .env.example .env.local
```
Then, fill in the required keys in `.env.local`:
- **API Base URL**: Configured by default to `http://localhost:8000/api` for local development.
- **Firebase Configuration**: Obtain these credentials from your Firebase Console -> Project Settings.
- **Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/) to enable the `@gemini` AI assistant in the community chat. (See [README_GEMINI.md](file:///Users/daniel/skill_exchange/skill-exchange-frontend/README_GEMINI.md) for detailed instructions).

### 3. Setup and Run the Backend Locally
To test the full functionality (user logins, skills, profiles, mentorship sessions), the backend API must be running.

1. Navigate to the backend repository folder: `../skill_exchange_api`.
2. Follow the setup instructions in the [Backend README](file:///Users/daniel/skill_exchange/skill_exchange_api/README.md):
   - Copy `.env.example` to `.env` (`cp .env.example .env`).
   - Create and activate a Python virtual environment.
   - Install dependencies (`pip install -r requirements.txt`).
   - Run database migrations (`python manage.py migrate`).
   - Create your administrator account (`python manage.py createsuperuser`).
   - (Optional) Populate the database with test data (`python manage.py populate_data --clear`).
   - Start the backend server (`python manage.py runserver`).
3. The backend API will run at `http://localhost:8000/api`. Ensure your `.env.local` has:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

### 4. Install Dependencies and Run the Frontend
Return to the frontend repository root and execute:
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the platform.
