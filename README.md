# 🌾 Gramify - Blockchain-Verified Rural Artisan Marketplace

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)](https://github.com)
[![Blockchain](https://img.shields.io/badge/Blockchain-Simulated-blue)](https://github.com)
[![Mobile First](https://img.shields.io/badge/Mobile-First-orange)](https://github.com)

> **Empowering 140M+ rural artisans with blockchain-verified digital identities**

A complete full-stack prototype marketplace connecting rural service providers with customers using blockchain verification. Built for hackathons and social impact.

---

## 🎯 Problem Statement

70% of rural artisans lack:
- ❌ Digital presence and trust mechanisms
- ❌ Transparent skill verification
- ❌ Direct customer access (middlemen exploitation)
- ❌ Portable digital reputation

**Gramify Solution**: Blockchain-verified marketplace that gives every rural artisan an immutable digital identity.

---

## ✨ Key Features

### 🔐 Blockchain Verification
- **Immutable artisan verification** recorded on simulated blockchain
- **Cryptographic proof** with SHA-256 hashing
- **Transaction provenance** for every booking
- **Transparent trust system** without crypto complexity

### 👥 Three User Roles
- **Artisan Dashboard**: Manage services, view verifications, track bookings
- **Customer Dashboard**: Browse verified artisans, book services, track orders
- **Admin Dashboard**: Verify artisans on blockchain, platform analytics

### 📱 Mobile-First Design
- Fully responsive (360px to desktop)
- Touch-optimized interface
- Clean, minimalist UI with shadcn/ui
- PWA-ready architecture

### 🎨 Complete Workflow
```
Admin Verifies Artisan → Blockchain Record Created
         ↓
Customer Browses Services → Books Verified Artisan
         ↓
Booking Recorded on Blockchain → Transparent Proof
         ↓
Artisan Receives Booking → Completes Service
```

---

## 🚀 Tech Stack

### Frontend
- **React.js** - UI framework
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API client

### Backend
- **Node.js** + **Express.js** - Server
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Blockchain
- **Simulated blockchain** using SHA-256 hashing
- **Transaction recording** for verifications & bookings
- **Provenance tracking** for service history
- **Ready for Web3 integration** (Ethereum/Polygon)

---

## 📁 Project Structure

```
gramify/
├── backend/                    # Node.js API server
│   ├── models/                # MongoDB schemas (User, Artisan, Booking)
│   ├── routes/                # API routes (auth, artisans, bookings, admin)
│   ├── middleware/            # JWT authentication
│   ├── utils/                 # Blockchain simulation logic
│   └── server.js              # Express server entry
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # shadcn components (Button, Card, etc.)
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Browse.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ArtisanProfile.jsx
│   │   │   ├── ArtisanDashboard.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/          # Auth context
│   │   ├── lib/              # API client & utilities
│   │   └── App.jsx
│   └── package.json
│
├── database/
│   └── seedData.json          # Sample data for demo
│
├── README.md                   # You are here
├── SETUP.md                    # Detailed setup instructions
├── PRESENTATION.md             # Hackathon pitch guide
└── PROJECT_SUMMARY.md          # Complete project overview
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### 1️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```
✅ Backend runs on `http://localhost:5000`

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend runs on `http://localhost:3000`

### 3️⃣ Login with Demo Users

| Role | Email | Password |
|------|-------|----------|
| 🔨 **Artisan (Verified)** | rajesh@gramify.com | rajesh123 |
| 🧵 **Artisan (Verified)** | priya@gramify.com | priya123 |
| 🏗️ **Artisan (Pending)** | amit@gramify.com | amit123 |
| 👤 **Customer** | ankit@gramify.com | ankit123 |
| 👨‍💼 **Admin** | admin@gramify.com | admin123 |

---

## 🎬 Demo Workflow

### 1. Admin Verifies Artisan
```
Login as Admin → Go to Dashboard → Click "Verify on Blockchain"
→ Blockchain hash generated → Artisan gets verified badge
```

### 2. Customer Books Service
```
Login as Customer → Browse Artisans → View Profile
→ Book Service → Blockchain proof created
```

### 3. Artisan Views Booking
```
Login as Artisan → Dashboard → See verification status
→ View incoming bookings with blockchain proof
```

---

## 🎯 Sample Data

### Artisans
- **Rajesh Kumar** - Electrician, Delhi (Verified ✅)
- **Priya Sharma** - Tailor, Mumbai (Verified ✅)
- **Amit Singh** - Mason, Uttar Pradesh (Pending ⏳)

### Services
- 9 services across categories (Electrical, Tailoring, Construction)

### Bookings
- 2 sample bookings with blockchain proof

See `database/seedData.json` for complete data.

---

## 📱 Mobile Responsive

Tested on:
- 📱 iPhone 12 (390px)
- 📱 Samsung Galaxy (360px)
- 📱 iPad (768px)
- 🖥️ Desktop (1024px+)

---

## 🎨 UI Components

Built with **shadcn/ui** for consistency:
- ✅ Button, Card, Input, Badge
- ✅ Navbar with mobile menu
- ✅ Protected routes
- ✅ Responsive grids
- ✅ Clean, minimalist design

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Artisans
- `GET /api/artisans` - Get all artisans
- `GET /api/artisans/:id` - Get artisan by ID
- `PUT /api/artisans/profile` - Update profile (protected)

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings` - Get user bookings (protected)
- `PUT /api/bookings/:id` - Update booking status (protected)

### Blockchain
- `GET /api/blockchain/verify/:id` - Verify blockchain record
- `GET /api/blockchain/stats` - Get blockchain stats
- `GET /api/blockchain/chain` - Get full chain (protected)

### Admin
- `POST /api/admin/verify-artisan/:id` - Verify artisan (admin only)
- `GET /api/admin/stats` - Platform statistics (admin only)
- `GET /api/admin/pending-artisans` - Pending verifications (admin only)

---

## 🏆 Hackathon Ready

### ✅ Working Features
- [x] Full authentication system
- [x] Role-based dashboards
- [x] Blockchain verification simulation
- [x] Service marketplace
- [x] Booking system with blockchain proof
- [x] Mobile-responsive design
- [x] Admin verification workflow

### 🎤 Presentation Assets
- `PRESENTATION.md` - 5-minute pitch structure
- `PROJECT_SUMMARY.md` - Complete overview
- Demo credentials included
- Live working prototype

---

## 🌟 Innovation Highlights

### Blockchain Without Complexity
- ✅ Benefits of blockchain (immutability, transparency)
- ✅ No crypto wallet needed
- ✅ No gas fees for users
- ✅ Familiar UX for rural users

### Social Impact
- 🌾 Targeting 140M+ rural workers
- 💰 $400B informal economy
- 🤝 Direct artisan-customer connection
- 📜 Portable digital identity

### Scalability Path
1. **Phase 1**: Simulated blockchain (current MVP)
2. **Phase 2**: Real Ethereum/Polygon integration
3. **Phase 3**: NFT badges, smart contracts
4. **Phase 4**: DAO governance

---

## 🛠️ Development

### Install Dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### Run Development Servers
```bash
# Backend (Terminal 1)
cd backend && npm start

# Frontend (Terminal 2)  
cd frontend && npm run dev
```

### Environment Variables
Backend `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gramify
JWT_SECRET=gramify_secret_key_2024_hackathon
NODE_ENV=development
```

---

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup guide
- **[PRESENTATION.md](./PRESENTATION.md)** - Hackathon pitch structure
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview
- **[database/seedData.json](./database/seedData.json)** - Sample data reference

---

## 🤝 Contributing

This is a hackathon prototype. For improvements:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📄 License

MIT License - Free to use for educational and hackathon purposes.

---

## 🎯 Future Roadmap

### Phase 1: Real Blockchain
- [ ] Ethereum/Polygon integration
- [ ] Smart contract deployment
- [ ] MetaMask support

### Phase 2: Enhanced Features
- [ ] Voice navigation (Hindi)
- [ ] Multi-language support
- [ ] SMS booking for feature phones
- [ ] Offline PWA capabilities

### Phase 3: Scale
- [ ] Government scheme integration
- [ ] B2B white-label solution
- [ ] DAO governance
- [ ] React Native mobile apps

---

## 💬 Support

**Setup Issues?** → Check [SETUP.md](./SETUP.md)  
**Demo Prep?** → Read [PRESENTATION.md](./PRESENTATION.md)  
**Questions?** → Open an issue

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

<div align="center">

**Built for Bharat 🇮🇳 | Verified on Blockchain ⛓️**

Made with ❤️ for rural artisans

[Demo](http://localhost:3000) • [Setup Guide](./SETUP.md) • [Presentation](./PRESENTATION.md)

</div>
