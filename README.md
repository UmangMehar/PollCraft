# 📊 PollCraft – Professional Polling Platform

A full-stack, real-time, dynamic polling application built with Spring Boot, React, Tailwind, and REST APIs.
Create polls, vote, view results, and manage everything from an elegant UI.

## 🚀 Features
🎯 Poll Management
Create polls with:
Question
Description
Multiple options
Single-choice OR multi-choice
Optional expiry date
View all polls sorted by most recent
Delete polls anytime

🗳️ Voting System
Vote on any poll
Single-choice or multiple-choice polls supported
Live vote count updates
Percentage calculation & smooth UI animations

🎨 Frontend Experience
Beautiful UI with Tailwind CSS
Confetti animation when poll is created
Tick animation when vote is submitted
Responsive layout for all screens

🛠️ Backend Features
RESTful API
DTO-based request handling
Entity relationships (OneToMany, ManyToOne)
Services + Repositories + Controller (Clean architecture)
Global CORS enabled
Database: MySQL / PostgreSQL / H2 (any JPA supported)

## 🏗️ Tech Stack
Frontend
React.js
Tailwind CSS
Lucide React Icons
Fetch API
Backend
Spring Boot
Spring Web
Spring Data JPA
Hibernate
Lombok
Database
MySQL (recommended)
H2 for quick testing

pollcraft-backend
├── controller
│   └── PollController.java
├── service
│   └── PollService.java
├── DTO
│   ├── PollRequest.java
│   └── VoteRequest.java
├── entity
│   ├── Poll.java
│   └── PollOption.java
├── repository
│   ├── PollRepository.java
│   └── PollOptionRepository.java
├── CORSConfiguration
│   └── WebConfig.java

pollcraft-frontend
├── App.js
├── PollList.js
├── PollDetail.js
├── CreatePollForm.js
└── components
    ├── Confetti
    ├── Animations
    └── Icons
 
## 🔌 API Endpoints
📌 Polls
Method	Endpoint	Description
GET	/api/polls	Get all polls
GET	/api/polls/{id}	Get poll by ID
POST	/api/polls	Create a new poll
DELETE	/api/polls/{id}	Delete a poll

Running the Project
Backend Setup
cd pollcraft-backend
mvn spring-boot:run

Frontend Setup
cd pollcraft-frontend
npm install
npm start
Backend runs at: http://localhost:8080
Frontend runs at: http://localhost:3000
 
ScreenShot  <img width="1680" height="861" alt="Screenshot 2025-11-13 233557" src="https://github.com/user-attachments/assets/be63ff7f-2a84-47a4-8684-97a981f372de" />
<img width="1444" height="863" alt="Screenshot 2025-11-13 234214" src="https://github.com/user-attachments/assets/cff8bde0-392c-4f67-8ab8-5569b3955270" />
<img width="1253" height="870" alt="Screenshot 2025-11-13 234245" src="https://github.com/user-attachments/assets/29982da1-1f17-494f-8c14-9a4cee0c4e2b" />
<img width="1897" height="896" alt="Screenshot 2025-11-13 235103" src="https://github.com/user-attachments/assets/7a88e7f2-9aa1-451d-bb70-acae012557f0" />
