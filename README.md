y# Task Tracker App

A full-stack task tracking application built using Express.js, React.js, and MongoDB.

## Features

- JWT Authentication (Signup/Login)
- Create up to 4 Projects per user
- Create, Read, Update, Delete Tasks under projects
- React Frontend with routing
- MongoDB backend with Mongoose models

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB instance (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
echo "MONGO_URI=<your mongodb uri>" > .env
echo "JWT_SECRET=supersecretkey" >> .env
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/projects` (auth required)
- `POST /api/projects` (auth required)
- `GET /api/tasks/:projectId`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Deployment

Deploy backend with Render or Railway. Frontend can be deployed on Vercel/Netlify.

---

Enjoy tracking tasks efficiently