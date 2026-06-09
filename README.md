# Expense Tracker Application

## Overview

Expense Tracker is a full-stack web application that helps users manage their daily expenses and income. Users can track transactions, view reports, and monitor their financial activities through a secure dashboard.

The application is built using:

* Frontend: React.js, Tailwind CSS
* Backend: Spring Boot, Spring Security, JWT Authentication
* Database: MongoDB
* Build Tools: Maven, Vite

---

## Features

### User Features

* User Registration and Login
* JWT Authentication and Authorization
* Access Token and Refresh Token Support
* Add Expense
* Add Income
* Update Existing Transactions
* Soft Delete Transactions
* Search Expenses and Income
* Dashboard Summary
* Recent Transactions View
* Monthly and Yearly Reports

### Admin Features

* Admin Login
* View All Users
* View All Expenses
* Dashboard Analytics
* User-wise Transaction Summary

### Security Features

* Spring Security Integration
* JWT Token Validation
* Role-Based Access Control (ADMIN / USER)
* Password Encryption using BCrypt
* Protected API Endpoints

---

## Project Structure

expense-tracker

├── backend

│ ├── src

│ ├── pom.xml

│ └── application.properties

│

├── frontend

│ ├── src

│ ├── package.json

│ └── vite.config.js

│

└── README.md

---

## Backend Setup

### Clone Repository

git clone <repository-url>

cd expense-tracker/backend

### Install Dependencies

mvn clean install

### Configure Environment

Update application.properties with:

spring.data.mongodb.uri=YOUR_MONGODB_URI

app.jwt.secret=YOUR_SECRET_KEY

### Run Backend

mvn spring-boot:run

Backend runs on:

http://localhost:8080

---

## Frontend Setup

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Run application:

npm run dev

Frontend runs on:

http://localhost:5173

---

## API Authentication

Protected APIs require:

Authorization: Bearer <access_token>

---

## Technologies Used

Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* React Toastify

Backend

* Spring Boot
* Spring Security
* JWT
* Maven
* Lombok

Database

* MongoDB Atlas

---

## Future Improvements

* Automatic Access Token Refresh
* Email Notifications
* Budget Planning Module
* Data Export (Excel / PDF)
* Charts and Analytics Dashboard

---

## Author

Arun Mohapatra

B.Tech CSE (AI & ML)

Gandhi Engineering College, Bhubaneswar
