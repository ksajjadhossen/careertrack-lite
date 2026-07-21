# CareerTrack Lite 💼

A full-stack, responsive job application tracking system designed to help users manage, search, filter, and track their job applications securely.

---

## 🔗 Live Links & Test Credentials

- **Live Frontend:** [https://careertrack-app.vercel.app](https://careertrack-app.vercel.app)
- **Live Backend API:** [https://careertrack-lite-3tkk.onrender.com](https://careertrack-lite-3tkk.onrender.com)
- **API Health Check:** `https://careertrack-lite-3tkk.onrender.com/api/health`

### 🔑 Test Account Credentials

- **Email:** `demo@example.com`
- **Password:** `12345678`

---

## 🛠️ Tech Stack & Database

- **Frontend:** React.js, TypeScript, CSS / Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, TypeScript, REST API
- **Database:** PostgreSQL (Hosted on Neon)
- **ORM:** Prisma ORM (v7)
- **Authentication:** JWT (JSON Web Tokens), `bcryptjs`
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## ✨ Key Features

1. **User Authentication & Authorization**
   - Secure user registration and login.
   - Passwords hashed with `bcryptjs`.
   - Protected backend and frontend routes using JWT.
   - User ownership enforcement (users can only see, edit, and delete their own applications).

2. **Job Application Management (CRUD)**
   - **Create:** Add new job applications with details like company name, job title, job post URL, source, status, application date, and notes.
   - **Read:** View a list of tracked applications or inspect a single application's details.
   - **Update:** Edit job application statuses, dates, or notes anytime.
   - **Delete:** Remove job applications with a safety confirmation prompt.

3. **Dashboard & Analytics**
   - Real-time statistics showing counts for: Total, Saved, Applied, Assessment, Interview, Rejected, and Offer status.
   - Quick access to recently added job applications.

4. **Search, Filter & Sort**
   - Search applications by company name or job title.
   - Filter applications by status or source.
   - Sort applications by Newest or Oldest first.

5. **Responsive UI & User Experience**
   - Fully responsive across mobile, tablet, and desktop devices.
   - Disabled submit buttons during network requests.
   - Error and loading state indicators.

---

## 📂 Environment Variables Setup

Create a `.env` file in the backend root directory (Refer to `.env.example`):

```env
PORT=5000
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="your_jwt_secret_key"
CLIENT_URL="[https://careertrack-app.vercel.app](https://careertrack-app.vercel.app)"
```
