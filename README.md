# Assignment 1 – Mini Project Manager   


## Student  
**Name:** Amulya Bhambri  
**Repository:** https://github.com/Amulya432/Pathlock_Assignment_Pec_Amulya_Bhambri

## Objective  
Setup a basic backend using .NET 8 / EF Core with authentication using JWT, and initial project entity.  
This assignment includes:
- User registration and login endpoints with JWT issuance.
- Project entity with properties: Title (3–100 chars), Description (optional, up to 500 chars), CreationDate.
- SQLite (or in-memory) database configured with EF Core and migrations.

## Tech Stack  
- Backend: .NET 8, C#, ASP.NET Core Web API  
- Data: Entity Framework Core, SQLite  
- Authentication: JWT (JSON Web Tokens)  
- Tools: VS Code / Visual Studio, dotnet CLI  

## API Endpoints  
### Auth
- `POST /api/v1/auth/register` — Register new user with email & password.  
- `POST /api/v1/auth/login` — Login user and receive JWT token.  

### Projects
- `GET /api/v1/projects` — Get list of authenticated user's projects.  
- `POST /api/v1/projects` — Create a new project.  
- `DELETE /api/v1/projects/{projectId}` — Delete a project by ID.  

## Setup Instruction  
### 1. Backend
```bash
cd backend
dotnet restore
dotnet build
dotnet ef migrations add InitAuth
dotnet ef database update
dotnet run

The API will run at https://localhost:5001 and/or http://localhost:5000 by default.

2. Testing

Use Swagger UI: go to https://localhost:5001/swagger once the app is running.

Test registration/login, then call projects endpoints using the JWT token returned.

Notes & Enhancements

Input validation is implemented using DataAnnotations (Title length, Description max length).

Separation of concerns: Models, DTOs, Services layers.

JWT secret, issuer, and audience are stored in appsettings.json




---

## 🎓 Assignment 2 README (Full-stack) 
```markdown
# Assignment 2 – Mini Project Manager (Full-stack & Smart Scheduler)  


## Student  
**Name:** Amulya Bhambri  
**Repository:** https://github.com/Amulya432/Pathlock_Assignment_Pec_Amulya_Bhambri  


## Objective  
Build a more comprehensive full-stack web application where users can register, log in, create projects and manage tasks within them. Additionally build a “Smart Scheduler” endpoint to automate task planning.

### Core Features  
#### Authentication  
- User registration and login using JWT.  
- Each user sees only their data.

#### Projects  
- A user can manage multiple projects with Title, Description, CreationDate.

#### Tasks  
- Each project can have multiple tasks: Title (required), optional DueDate, Completion status.  
- Each task references its parent project.

#### Backend (C# .NET 8)  
- REST API using ASP.NET Core & EF Core.  
- Storage: SQLite (or in-memory) for simplicity.  
- Input validation via DataAnnotations.  
- Clean architecture: DTOs, Services, Models.

### API Endpoints  
#### Auth  
- `POST /api/v1/auth/register`, `POST /api/v1/auth/login`

#### Projects  
- `GET /api/v1/projects`, `GET /api/v1/projects/{id}`  
- `POST /api/v1/projects`, `DELETE /api/v1/projects/{id}`  

#### Tasks  
- `GET /api/v1/projects/{projectId}/tasks`  
- `POST /api/v1/projects/{projectId}/tasks`  
- `PUT /api/v1/projects/{projectId}/tasks/{taskId}`  
- `DELETE /api/v1/projects/{projectId}/tasks/{taskId}`  
- `PUT` toggles completion status.

### Enhancements (Bonus)  
- **Smart Scheduler API:** `POST /api/v1/projects/{projectId}/schedule` accepts input and returns an output plan.  
- Loading indicators in frontend, mobile-friendly UI, and deployment to Vercel (frontend) & Render (backend).

## Frontend (React + TypeScript)  
- Pages: Login/Register, Dashboard (list of projects), Project Details (tasks list).  
- Routing via React Router v6.  
- JWT stored in localStorage and used in `Authorization` header.  
- Axios/fetch for API calls with token.  
- Form validation and error handling in UI.  
- Responsive and mobile-friendly design.

## Setup Instructions  
### Backend  
```bash
cd backend
dotnet restore
dotnet build
dotnet ef migrations add InitFull
dotnet ef database update
dotnet run


