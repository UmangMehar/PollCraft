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
 │     └── PollController.java
 ├── service
 │     └── PollService.java
 ├── DTO
 │     ├── PollRequest.java
 │     └── VoteRequest.java
 ├── entity
 │     ├── Poll.java
 │     └── PollOption.java
 ├── repository
 │     ├── PollRepository.java
 │     └── PollOptionRepository.java
 ├── CORSConfiguration
 │     └── WebConfig.java

pollcraft-frontend
 ├── App.js
 ├── PollList.js
 ├── PollDetail.js
 ├── CreatePollForm.js
 └── components (Confetti, Animations, Icons)
 
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
