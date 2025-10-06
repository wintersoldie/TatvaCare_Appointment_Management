# 🩺 TatvaCare Appointment Management System

## 📘 Overview
**TatvaCare Appointment Management** is a full-stack web application built with  
**ASP.NET Core 8 (Web API)** and **Angular 17**, designed to simplify the scheduling and tracking of patient appointments.  

This system provides doctors and patients with an easy way to manage appointments, view schedules, and perform CRUD operations — all wrapped in a responsive and secure interface.

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | Angular 17, TypeScript, Bootstrap 5 |
| Backend | ASP.NET Core 8 Web API |
| Database | SQLite |
| Authentication | JSON Web Token (JWT) |
| UI Design | Bootstrap 5, Font Awesome |

---

## 🏗️ System Architecture

[ Angular 17 Frontend ] ←→ [ .NET 8 Web API ] ←→ [ SQLite Database ]
│ │ │
│ JWT Auth Header │ EF Core ORM │
▼ ▼ ▼
User Interface Controllers & Services Data Models



---

## ⚙️ Setup Instructions

### 🖥 Backend Setup (ASP.NET Core 8 API)

1. Navigate to the backend folder:
   ```bash
   cd Project_Backend
Restore dependencies:

bash
dotnet restore
Run the backend API:

bash
dotnet run
The API will start at:

arduino
http://localhost:5234
🌐 Frontend Setup (Angular 17)
Navigate to the frontend folder:

bash
cd Project_Frontend
Install dependencies:

bash
npm install
Run the Angular app:

bash
ng serve
Open in browser:

arduino
http://localhost:4200

| Category              | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| **Authentication**    | JWT-based login/logout with token storage in session            |
| **Appointments CRUD** | Create, Read, Update, Delete appointments with validation       |
| **Search & Filter**   | Filter appointments by doctor or patient name                   |
| **Pagination**        | View 5 records per page with previous/next navigation           |
| **Validation**        | Start date/time must be earlier than end date/time              |
| **Reactive Forms**    | Angular reactive forms for reliability and clarity              |
| **UI/UX**             | Modern Bootstrap design with hover effects and alternating rows |
| **Security**          | Protected API endpoints using Bearer token authentication       |
| **Error Handling**    | Graceful UI alerts and console-level debugging support          |


🧠 Assumptions
Demo login credentials: demoUser / demoPass

JWT is generated for demo authentication only.

SQLite database (appointments.db) is used for simplicity.

Backend runs at http://localhost:5234

Frontend runs at http://localhost:4200

| HTTP Method | Endpoint                | Description                         |
| ----------- | ----------------------- | ----------------------------------- |
| `POST`      | `/api/auth/login`       | Authenticate and generate JWT token |
| `GET`       | `/api/appointment`      | Get all appointments                |
| `POST`      | `/api/appointment`      | Create a new appointment            |
| `PUT`       | `/api/appointment/{id}` | Update existing appointment         |
| `DELETE`    | `/api/appointment/{id}` | Delete an appointment               |


🧭 Future Enhancements
✅ Add Doctor and Patient user roles

✅ Email/SMS reminders for appointments

✅ Implement appointment calendar view

✅ Add user registration & password hashing

✅ Deploy using Azure Web App or cloud hosting


👨‍💻 Author
Shreyash Raghubanshi
📧 [soldierwinter013@gmail.com]

Developed as part of the TatvaCare Full-Stack Assignment — demonstrating secure APIs, clean Angular architecture, and thoughtful UI/UX design.

---
