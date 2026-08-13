AI Interview Platform

An AI-powered interview preparation platform designed to help candidates prepare for technical interviews through AI mock interviews, resume analysis, coding rounds, performance analytics, interview history, and personalized recommendations.

🚀 Features

🔐 Authentication

User signup and login

JWT-based authentication

Forgot password and reset password

Change password

Delete account

Protected routes

📄 AI Resume Analyzer

Upload resume in PDF format

Extract resume text

AI-powered resume analysis

ATS score and grammar score

Strengths and weaknesses

Missing skills

Project suggestions

Interview questions

Personalized learning path

Resume history

🎤 AI Mock Interview

Start mock interviews

Answer interview questions

AI evaluation using Google Gemini

Question-level score and feedback

Strengths and weaknesses

Recommended topics

Overall interview score

Interview report and history

Evaluation notifications

💻 Coding Round

Coding problems with difficulty levels

Run and submit code

Test case results

Execution time and memory usage

Coding submissions and history

📊 Dashboard & Analytics

Total interviews

Average interview score

ATS resume score

Coding problems solved

Performance charts

Recent interviews

AI recommendations

Analytics and progress tracking

🔔 Notifications

Interview evaluation notifications

Notification preferences

Interview reminders

Interview result notifications

Resume analysis notifications

Mark notification as read

Mark all notifications as read

⚙️ Settings

Profile management

Notification preferences

Password management

Account deletion

Light and dark themes

🛠️ Tech Stack

Frontend

React

Vite

React Router

Redux Toolkit

Axios

Tailwind CSS

Framer Motion

Lucide React

React Circular Progressbar

Backend

Node.js

Express.js

JWT

MySQL

Multer

Google Gemini API

Cloudinary

Nodemailer

Judge0 API

📁 Project Structure

AI-INTERVIEW-PLATFORM/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── routes/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── package.json
│
├── .gitignore
└── README.md

🔄 AI Interview Evaluation

Candidate Answer
       ↓
Google Gemini
       ↓
Question Evaluation
       ↓
Score (0–10)
       ↓
Feedback + Strengths + Weaknesses
       ↓
Recommended Topics
       ↓
Average Question Scores
       ↓
Overall Interview Score (%)
       ↓
Interview Report
       ↓
Dashboard + Notification

Question-level scores are evaluated on a 0–10 scale. The average is then converted to a percentage.

Example:

8 + 9 + 7 + 8
---------------
      4

Average = 8/10
Overall = 80%

🔑 Environment Variables

Backend

Create server/.env:

PORT=5000

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GEMINI_API_KEY=
GEMINI_MODEL=

EMAIL_USER=
EMAIL_PASSWORD=

FRONTEND_URL=http://localhost:5173

JUDGE0_URL=

Frontend

Create client/.env:

VITE_API_URL=http://localhost:5000/api

Never commit .env files, API keys, passwords, JWT secrets, or other credentials to GitHub.

💻 Installation

1. Clone the repository

git clone <your-repository-url>
cd AI-INTERVIEW-PLATFORM

2. Install frontend dependencies

cd client
npm install

3. Install backend dependencies

In another terminal:

cd server
npm install

4. Configure environment variables

Create server/.env and client/.env using the templates above.

5. Start the backend

From server/:

npm start

The API runs locally on:

http://localhost:5000

6. Start the frontend

From client/:

npm run dev

The frontend normally runs on:

http://localhost:5173

🔒 Security

JWT authentication for protected APIs

Password hashing

Protected frontend routes

Environment variables for secrets

User-specific database queries

Authorization middleware

Cloudinary storage for uploaded resumes

Sensitive configuration excluded through .gitignore

📈 Future Improvements

Independent AI scoring for technical knowledge, communication, confidence, and problem-solving

More interview domains and question sets

Real-time AI interview conversation

Advanced analytics

More coding languages

Achievements and leaderboards

Improved email/browser notifications

Production monitoring

🎯 Purpose

The platform provides a single workflow where candidates can:

Analyze → Practice → Evaluate → Improve → Track

their interview preparation using AI-powered tools.

👨‍💻 Author

Sachin Bisht

AI Interview Platform