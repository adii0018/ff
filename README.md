# 🔥 FF Arena — Free Fire Tournament Platform

A full-stack esports tournament hosting platform for Free Fire. Hosts create tournaments with UPI QR codes, players register by paying the entry fee, and hosts approve/reject registrations from their dashboard.

---

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + Axios + React Router
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **File Uploads**: Cloudinary
- **Auth**: JWT

---

## Project Structure

```
root/
  frontend/       # React Vite app
  backend/        # Express API
  README.md
```

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone <repo-url>
cd <repo-folder>
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/freefire-tournaments
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev     # development (nodemon)
npm start       # production
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

---

### 4. Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → copy Cloud Name, API Key, API Secret
3. Paste into backend `.env`

---

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | No | Host register |
| POST | `/api/auth/login` | No | Host login |
| GET | `/api/tournaments` | No | List all tournaments |
| GET | `/api/tournaments/:id` | No | Get tournament by ID |
| POST | `/api/tournaments/create` | Yes | Create tournament |
| GET | `/api/tournaments/host/mine` | Yes | Host's tournaments |
| POST | `/api/registrations` | No | Player registration |
| GET | `/api/registrations/:tournamentId` | Yes | Get registrations |
| PATCH | `/api/registrations/approve/:id` | Yes | Approve player |
| PATCH | `/api/registrations/reject/:id` | Yes | Reject player |

---

## Deployment

### Backend → Render
1. Push backend to GitHub
2. Create a new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add all environment variables from `.env`

### Frontend → Vercel / Render
1. Push frontend to GitHub
2. Import on Vercel (or Render Static Site)
3. Set `VITE_API_URL` to your Render backend URL
4. Build command: `npm run build`, output: `dist`

---

## Features

- Host register/login with JWT auth
- Create tournaments with UPI QR code upload
- Public tournament pages at `/tournament/:id`
- Player registration with payment screenshot upload
- Host dashboard with approve/reject controls
- Dark esports-themed UI (black + purple + neon blue)
- Mobile responsive
- Loading states and error handling
