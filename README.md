# Astrologer CRM

## Project Overview

Astrologer CRM is a MERN stack application designed to help astrologers manage clients and appointments efficiently.

## Features

* User Authentication (JWT)
* Register/Login System
* Protected Routes
* Client Management (Create, Read, Update, Delete)
* Appointment Management (Create, Read, Update, Delete)
* Dashboard Analytics
* MongoDB Atlas Integration

## Tech Stack

Frontend:

* React.js
* Tailwind CSS
* Axios
* React Router DOM

Backend:

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a .env file inside backend:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Clients

* GET /api/clients
* POST /api/clients
* PUT /api/clients/:id
* DELETE /api/clients/:id

### Appointments

* GET /api/appointments
* POST /api/appointments
* PUT /api/appointments/:id
* DELETE /api/appointments/:id

### Dashboard

* GET /api/dashboard/stats

## Project Structure

backend/
frontend/

## Developer

Smriti
