# Gramify - Setup & Run Instructions

## 🚀 Complete Setup Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

---

## 📦 Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB connection string if needed:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gramify
   JWT_SECRET=gramify_secret_key_2024_hackathon
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - **Windows:** Open MongoDB Compass or start MongoDB service
   - **Mac/Linux:** `sudo systemctl start mongod` or `brew services start mongodb-community`

5. **Start backend server:**
   ```bash
   npm start
   ```
   
   Backend will run on: `http://localhost:5000`

---

## 🎨 Frontend Setup

1. **Navigate to frontend folder (new terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on: `http://localhost:3000`

---

## 🧪 Testing with Sample Data

### Login Credentials (Demo Users)

**Artisan 1 (Verified):**
- Email: `rajesh@gramify.com`
- Password: `rajesh123`

**Artisan 2 (Verified):**
- Email: `priya@gramify.com`
- Password: `priya123`

**Artisan 3 (Unverified):**
- Email: `amit@gramify.com`
- Password: `amit123`

**Customer:**
- Email: `ankit@gramify.com`
- Password: `ankit123`

**Admin:**
- Email: `admin@gramify.com`
- Password: `admin123`

---

## 🔄 Workflow Testing

### 1. **Admin Verifies Artisan:**
   - Login as Admin (`admin@gramify.com`)
   - Go to Admin Dashboard
   - Verify pending artisan (Amit Singh) on blockchain
   - See blockchain verification hash generated

### 2. **Customer Books Service:**
   - Login as Customer (`ankit@gramify.com`)
   - Browse artisans
   - View artisan profile (see blockchain verified badge)
   - Book a service
   - See blockchain proof generated for booking

### 3. **Artisan Views Bookings:**
   - Login as Artisan (`rajesh@gramify.com`)
   - View dashboard
   - See blockchain verification status
   - View incoming bookings with blockchain proof

---

## 🎯 Features to Demonstrate

### ✅ Blockchain Features (Simulated):
- Artisan verification on blockchain
- Blockchain verification badges
- Transaction hashes for bookings
- Provenance tracking
- Blockchain stats display

### ✅ Core Features:
- User authentication (JWT)
- Role-based dashboards (Artisan/Customer/Admin)
- Service marketplace
- Booking system
- Mobile-responsive design
- Clean minimalist UI with shadcn

---

## 📱 Mobile Testing

Open browser DevTools (F12) → Toggle device toolbar → Test on:
- iPhone 12 (390px)
- Samsung Galaxy (360px)
- iPad (768px)

---

## 🐛 Troubleshooting

**Backend won't start:**
- Check MongoDB is running: `mongod --version`
- Check port 5000 is free: `netstat -ano | findstr :5000` (Windows)
- Kill process if needed: `taskkill /PID <PID> /F`

**Frontend won't start:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 3000 is free
- Ensure backend is running first

**Database issues:**
- Delete database and restart: `use gramify` → `db.dropDatabase()`
- Check MongoDB connection string in `.env`

---

## 📂 Project Structure

```
gramify/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── utils/           # Blockchain simulation
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Auth context
│   │   └── lib/         # API client & utils
│   └── package.json
├── database/
│   └── seedData.json    # Sample data reference
└── README.md
```

---

## 🎬 Demo Presentation Flow

1. **Home Page** - Show blockchain stats
2. **Browse Artisans** - Filter and search
3. **Login as Admin** - Verify artisan on blockchain
4. **Login as Customer** - Book service with blockchain proof
5. **Login as Artisan** - View verified status and bookings
6. **Show Blockchain Verification** - Display hashes and proofs

---

## 🚀 Deployment (Optional)

**Frontend:** Deploy to Vercel/Netlify
**Backend:** Deploy to Render/Railway
**Database:** Use MongoDB Atlas (free tier)

---

## 📞 Support

For issues or questions during hackathon, check:
- Backend logs in terminal
- Browser console (F12)
- Network tab for API errors

---

**Ready to demo! 🎉**
