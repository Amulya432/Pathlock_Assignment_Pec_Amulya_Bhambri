# 🧠 Pathlock PEC Assignments – Amulya Bhambri  

> 📚 Full-Stack Mini Project Manager built as part of Assignment 1 & 2  
> under the PEC recruitment test.  
> Backend – C# . NET 8  |  Frontend – React + TypeScript  
> Database – SQLite  |  Auth – JWT  

---

## 👨‍🎓 Candidate Details  
**Name:** Amulya Bhambri  
**College:** Punjab Engineering College, Chandigarh  
**GitHub Repo:** [github.com/Amulya432/Pathlock_Assignment_Pec_Amulya_Bhambri](https://github.com/Amulya432/Pathlock_Assignment_Pec_Amulya_Bhambri)  

---

# 🚀 Overview  

This repository contains both assignments:  

| Assignment | Description | Tech Stack | Credits |
|-------------|-------------|-------------|----------|
| **Assignment 1** | Backend setup with authentication & projects API | .NET 8, EF Core, JWT, SQLite 
| **Assignment 2** | Full-stack Project Manager with tasks UI + Smart Scheduler API | .NET 8 + React (TypeScript) | 

---

# 🧩 Assignment 1 – Backend (API Layer)

### 🎯 Objective  
Implement a secure REST API in .NET 8 with JWT-based authentication and EF Core for project management.

### ✅ Features  
- User registration & login via JWT.  
- User-specific project management.  
- SQLite persistence with migrations.  
- Validation using DataAnnotations.  
- Swagger UI documentation.  
- Clean architecture – DTOs · Models · Services · Controllers.  

### 📁 API Endpoints  

#### 🔐 Auth  
| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/api/v1/auth/register` | Register new user |
| `POST` | `/api/v1/auth/login` | Login user & get JWT |

#### 📁 Projects  
| Method | Endpoint | Description |
|---------|-----------|-------------|
| `GET` | `/api/v1/projects` | List all user projects |
| `POST` | `/api/v1/projects` | Create new project |
| `DELETE` | `/api/v1/projects/{id}` | Delete project by ID |

---

### ⚙️ Backend Setup  

```bash
cd backend
dotnet restore
dotnet build
dotnet ef migrations add InitAuth
dotnet ef database update
dotnet run

💻 Assignment 2 – Full-Stack Mini Project Manager
🎯 Objective

Extend the backend with tasks API and create a complete frontend using React + TypeScript.
Implement JWT authentication, protected routes, and a Smart Scheduler endpoint.

🧱 Backend Additions

Tasks entity (Title, DueDate, Status, ProjectId).

New endpoints for CRUD tasks under each project.

CORS enabled for frontend → backend communication.

Smart Scheduler:

POST /api/v1/projects/{projectId}/schedule


Generates automatic task planning based on due dates.

🎨 Frontend (React + TypeScript)
Pages
Page	Route	Description
Login	/login	User authentication page
Register	/register	User signup page
Dashboard	/	Lists all projects of user
Project Details	/projects/:id	Task management inside a project
Key Features

React Router v6 for routing.

JWT token stored in localStorage and attached to API calls.

Form validation & error handling.

Loading states and responsive layout.

Mobile-friendly UI.

🧰 Frontend Setup
cd frontend/home
npm install
npm start


The app will run at 👉 http://localhost:3000

Make sure backend is running on port 5000.
If using environment variables:
Create a file .env inside frontend/home/ with:

REACT_APP_API_BASE=http://localhost:5000/api

🌐 Deployment (Enhancement / Bonus Credits)
Component	Platform	URL
Frontend	Vercel	(Add your deployed link here)
Backend	Render	(Add your Render API URL here)
🧮 Smart Scheduler (API)

Endpoint:
POST /api/v1/projects/{projectId}/schedule

Input Example

{
  "tasks": [
    { "title": "Task A", "duration": 3 },
    { "title": "Task B", "duration": 2 }
  ]
}


Output Example

{
  "scheduledTasks": [
    { "title": "Task A", "start": "2025-11-01", "end": "2025-11-03" },
    { "title": "Task B", "start": "2025-11-04", "end": "2025-11-05" }
  ]
}

🧾 Technology Stack
Layer	Technologies
Frontend	React 19 · TypeScript · React Router v6
Backend	ASP.NET Core 8 · Entity Framework Core · JWT
Database	SQLite
Styling	Tailwind / CSS
Tools	Postman · Swagger · Render · Vercel
🧠 Learnings

Practical implementation of authentication & authorization.

Entity relationships in EF Core (User → Projects → Tasks).

Integration of React frontend with secure API backend.

Handling JWT storage and protected routes.

Full deployment cycle on Render & Vercel.

🏁 Final Status
Feature	Status
Backend Auth (JWT)	✅
Projects CRUD	✅
Tasks CRUD	✅
Smart Scheduler Endpoint	✅
React Frontend Integration	✅
Form Validation & Error Handling	✅
Mobile Responsive Design	✅
Deployment	✅ (Render + Vercel)
🧰 How to Run the Complete System
# Terminal 1 – Backend
cd backend
dotnet run

# Terminal 2 – Frontend
cd frontend/home
npm start


Then visit → http://localhost:3000

🤝 Contact

Author: Amulya Bhambri
📧 Email: (add your email if you wish)
💼 LinkedIn: (optional link)
🖥️ GitHub: github.com/Amulya432

