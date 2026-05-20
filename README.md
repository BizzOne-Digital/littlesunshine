# Little Sunshine Early Learning Centre – MERN Website

Full-stack MERN website with public pages + admin panel.
Deployed separately on Vercel: **Backend** + **Frontend**.

---

## Project Structure

```
little-sunshine/
├── backend/     → Deploy as separate Vercel project
└── frontend/    → Deploy as separate Vercel project
```

---

## 🚀 Vercel Deployment Guide

### STEP 1 – Deploy Backend

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo (backend folder)
3. Set **Root Directory** → `backend`
4. Add these **Environment Variables** in Vercel dashboard:

| Variable | Value |
|---|---|
| `MONGO_URI` | `mongodb+srv://zubairxcoder_db_user:zubairxcoder@cluster0.bwpdzae.mongodb.net/LittleShine?retryWrites=true&w=majority` |
| `JWT_SECRET` | `ewewewwerw` (change this!) |
| `JWT_EXPIRE` | `7d` |
| `EMAIL_USER` | `littlesunshineelc23@gmail.com` |
| `EMAIL_PASS` | your Gmail App Password |
| `ADMIN_EMAIL` | `littlesunshineelc23@gmail.com` |
| `FRONTEND_URL` | *(add after frontend deployed, e.g. `https://little-sunshine.vercel.app`)* |
| `NODE_ENV` | `production` |

5. Click **Deploy**
6. Copy your backend URL (e.g. `https://little-sunshine-api.vercel.app`)

---

### STEP 2 – Deploy Frontend

1. Go to Vercel → **Add New Project** again
2. Import same repo, set **Root Directory** → `frontend`
3. Add this **Environment Variable**:

| Variable | Value |
|---|---|
| `REACT_APP_API_URL` | `https://little-sunshine-api.vercel.app` *(your backend URL from Step 1)* |

4. Click **Deploy**
5. Copy your frontend URL

---

### STEP 3 – Connect Frontend URL to Backend

1. Go to your **Backend** project on Vercel
2. Settings → Environment Variables
3. Add/update `FRONTEND_URL` = `https://little-sunshine-frontend.vercel.app`
4. **Redeploy** the backend

---

### STEP 4 – Create Admin Account (One Time)

Once backend is live, run this once:
```
POST https://your-backend.vercel.app/api/auth/setup
```

Using browser or Postman:
```
https://your-backend.vercel.app/api/auth/setup
```
Method: POST (no body needed)

Admin credentials:
- Email: `littlesunshineelc23@gmail.com`
- Password: `Admin@123!`

**Change password after first login!**

---

## Local Development

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in values
npm run dev            # runs on port 5000

# Frontend
cd frontend
npm install
# .env.local already set to localhost:5000
npm start              # runs on port 3000
```

---

## Gmail App Password Setup

1. Google Account → Security → 2-Step Verification (enable)
2. Security → App Passwords → Create → "Mail"
3. Copy 16-character password → paste in `EMAIL_PASS`

---

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/programs` | Programs & Fees |
| `/team` | Our Team |
| `/contact` | Contact |
| `/waitlist` | Join Waitlist |
| `/resources` | Links & Resources |
| `/admin/login` | Admin Login |
| `/admin` | Dashboard |
| `/admin/waitlist` | Waitlist Management |
| `/admin/messages` | Contact Messages |
