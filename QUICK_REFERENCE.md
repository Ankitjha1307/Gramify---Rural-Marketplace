# 🚀 Gramify - Quick Reference Card

## ⚡ Start Commands

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

**URLs:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## 🔑 Login Credentials

| User | Email | Password | Role |
|------|-------|----------|------|
| Rajesh | rajesh@gramify.com | rajesh123 | Artisan (Verified) |
| Priya | priya@gramify.com | priya123 | Artisan (Verified) |
| Amit | amit@gramify.com | amit123 | Artisan (Pending) |
| Ankit | ankit@gramify.com | ankit123 | Customer |
| Admin | admin@gramify.com | admin123 | Admin |

---

## 🎯 Demo Flow (2 minutes)

### 1. Admin Verifies Artisan (30 sec)
```
Login: admin@gramify.com / admin123
→ Dashboard → Verify Amit Singh
→ Show blockchain hash generated ✅
```

### 2. Customer Books Service (45 sec)
```
Logout → Login: ankit@gramify.com / ankit123
→ Browse → Rajesh's Profile
→ Book "Electrical Repair"
→ Show blockchain proof ✅
```

### 3. Artisan Views Booking (30 sec)
```
Logout → Login: rajesh@gramify.com / rajesh123
→ Dashboard → See verification status
→ View booking with blockchain proof ✅
```

### 4. Show Stats (15 sec)
```
Home page → Blockchain stats
Admin dashboard → Platform analytics
```

---

## 💡 Key Talking Points

1. **"Blockchain verification without crypto complexity"**
2. **"140M rural workers need digital trust"**
3. **"Immutable proof, transparent history"**
4. **"Built for Bharat, verified on blockchain"**

---

## 🎤 Elevator Pitch (30 seconds)

*"Gramify solves the trust problem in India's $400B informal economy. We give 140 million rural artisans blockchain-verified digital identities. Every verification is immutable, every transaction is transparent. No crypto wallets, no complexity - just trust through technology."*

---

## 🛠️ Troubleshooting

**Backend won't start?**
- Check MongoDB running: `mongod --version`
- Check port 5000 free

**Frontend won't start?**
- Check backend is running first
- Clear cache: `rm -rf node_modules && npm install`

**Login fails?**
- Check backend console for errors
- Verify MongoDB connection

---

## 📊 Project Stats

- **Lines of Code**: ~3,500
- **Components**: 15+
- **API Routes**: 12
- **Pages**: 7
- **Build Time**: 1 day
- **Tech Stack**: MERN + Blockchain simulation

---

## 🏆 Winning Features

✅ Full working prototype  
✅ Real blockchain simulation  
✅ Mobile-responsive  
✅ Clean, professional UI  
✅ Social impact focus  
✅ Scalable architecture  

---

## 📂 File Locations

- **Backend entry**: `backend/server.js`
- **Frontend entry**: `frontend/src/App.jsx`
- **Blockchain logic**: `backend/utils/blockchain.js`
- **Sample data**: `database/seedData.json`
- **Setup guide**: `SETUP.md`
- **Pitch guide**: `PRESENTATION.md`

---

## 🎨 Color Scheme

- Primary: `#16a34a` (Green)
- Secondary: `#78716c` (Stone)
- Background: `#ffffff` (White)
- Accent: `#f0fdf4` (Light green)

---

## 📱 Test Devices

- iPhone 12 (390px)
- Samsung Galaxy (360px)
- iPad (768px)
- Desktop (1024px+)

---

**Print this and keep handy during hackathon! 🚀**
