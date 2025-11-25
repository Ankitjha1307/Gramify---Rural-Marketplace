# 🎉 Gramify MVP - Complete Hackathon Prototype

## ✅ What's Been Built

### 🔧 Backend (Node.js + Express + MongoDB)
- **Authentication System**: JWT-based with role management
- **Simulated Blockchain**: SHA-256 hashing for verification & provenance
- **API Routes**:
  - `/api/auth` - Login/Register
  - `/api/artisans` - Artisan management
  - `/api/bookings` - Booking system
  - `/api/blockchain` - Blockchain verification
  - `/api/admin` - Admin operations
- **MongoDB Models**: User, Artisan, Booking schemas
- **Middleware**: JWT authentication, admin authorization

### 🎨 Frontend (React + shadcn/ui + Tailwind)
- **Pages**:
  - Home - Landing with blockchain stats
  - Browse - Artisan marketplace with search
  - Login - Demo credentials included
  - Artisan Profile - Full profile with booking
  - Artisan Dashboard - Manage services & bookings
  - Customer Dashboard - View & track bookings
  - Admin Dashboard - Verify artisans on blockchain
- **Components**: Navbar, Card, Button, Input, Badge
- **Mobile Responsive**: Optimized for 360px+
- **Clean Design**: Minimalist earthy color scheme

### ⛓️ Blockchain Simulation (JavaScript)
- **Verification System**: Creates immutable blockchain records
- **Features**:
  - Artisan verification with blockchain ID
  - Booking provenance tracking
  - Transaction hash generation
  - Blockchain stats dashboard
  - SHA-256 cryptographic hashing
- **Ready for Web3**: Code structure supports real Ethereum integration

### 📊 Sample Data
- **3 Artisans**:
  - Rajesh Kumar (Electrician, Delhi) - Verified
  - Priya Sharma (Tailor, Mumbai) - Verified
  - Amit Singh (Mason, UP) - Pending verification
- **1 Customer**: Ankit Verma
- **1 Admin**: Admin User
- **Services**: 9 total across categories
- **Bookings**: 2 sample bookings with blockchain proof

---

## 🚀 Quick Start

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```
Server runs on: `http://localhost:5000`

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on: `http://localhost:3000`

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Artisan (Verified)** | rajesh@gramify.com | rajesh123 |
| **Artisan (Verified)** | priya@gramify.com | priya123 |
| **Artisan (Pending)** | amit@gramify.com | amit123 |
| **Customer** | ankit@gramify.com | ankit123 |
| **Admin** | admin@gramify.com | admin123 |

---

## 🎯 Core Features Demonstrated

### ✅ Blockchain Verification
- Admin verifies artisan → Blockchain record created
- Cryptographic hash generated (SHA-256)
- Immutable verification badge
- View blockchain stats (blocks, transactions)

### ✅ Service Marketplace
- Browse verified artisans
- Search by name, skill, location
- View detailed profiles
- Mobile-optimized cards

### ✅ Booking System
- Book services with blockchain proof
- Transaction recorded on blockchain
- View booking history
- Status tracking

### ✅ Role-Based Dashboards
- **Artisan**: View verification status, manage bookings
- **Customer**: Browse services, track bookings
- **Admin**: Verify artisans, view platform stats

---

## 📱 Mobile-First Design

Fully responsive for:
- 📱 Mobile (360px - 768px)
- 📱 Tablet (768px - 1024px)
- 🖥️ Desktop (1024px+)

Touch-optimized buttons and navigation for rural users.

---

## 🔄 Demo Workflow

1. **Login as Admin** → Verify pending artisan (Amit)
2. See blockchain hash generated
3. **Login as Customer** → Browse artisans
4. View verified badge on artisan profiles
5. Book a service → Blockchain proof created
6. **Login as Artisan** → View verification & bookings

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend (Port 3000)      │
│  shadcn/ui + Tailwind + Mobile-First   │
└─────────────────┬───────────────────────┘
                  │ REST API
┌─────────────────▼───────────────────────┐
│      Node.js Backend (Port 5000)        │
│   Express + JWT Auth + Blockchain      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         MongoDB Database                │
│  Users | Artisans | Bookings           │
└─────────────────────────────────────────┘
```

---

## 💡 Hackathon Highlights

### **Innovation**: Blockchain trust without crypto complexity
### **Impact**: 140M+ rural workers empowered
### **Tech**: Full-stack MERN + simulated blockchain
### **UX**: Mobile-first, minimalist, accessible
### **Demo-Ready**: Working prototype in 1 day

---

## 📂 Project Files

```
gramify/
├── backend/                 ✅ Complete
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth middleware
│   ├── utils/              # Blockchain simulation
│   └── server.js
├── frontend/                ✅ Complete
│   ├── src/
│   │   ├── components/     # shadcn UI components
│   │   ├── pages/          # All 7 pages
│   │   ├── context/        # Auth context
│   │   └── lib/            # API client
│   └── package.json
├── database/                ✅ Sample data
│   └── seedData.json
├── README.md                ✅ Overview
├── SETUP.md                 ✅ Installation guide
└── PRESENTATION.md          ✅ Pitch guide
```

---

## 🎯 Next Steps (Post-Hackathon)

### Phase 1: Real Blockchain
- [ ] Integrate Polygon/Ethereum
- [ ] Deploy smart contracts
- [ ] Add MetaMask support

### Phase 2: Enhanced Features
- [ ] Voice-based navigation (Hindi)
- [ ] SMS booking for feature phones
- [ ] Multi-language support
- [ ] Offline PWA capabilities

### Phase 3: Scale
- [ ] Government scheme integration
- [ ] B2B white-label solution
- [ ] DAO governance
- [ ] Mobile apps (React Native)

---

## 🏆 Winning Elements

✅ **Working Prototype** - Not just slides  
✅ **Real Problem** - 140M users need this  
✅ **Blockchain Innovation** - Trust through technology  
✅ **Social Impact** - Empowering rural Bharat  
✅ **Scalable** - Clear path to production  
✅ **Demo-Ready** - Smooth presentation flow  

---

## 🎤 Elevator Pitch

*"Gramify is blockchain-verified marketplace for rural artisans. We solve the trust problem in informal economy by giving 140 million skilled workers immutable digital identities. Every artisan is verified on blockchain, every booking is transparently tracked. Built for Bharat, verified on blockchain."*

---

## 📞 Support

**Setup Issues?** Check `SETUP.md`  
**Demo Prep?** Read `PRESENTATION.md`  
**Technical Docs?** See inline code comments

---

## 🙏 Credits

Built with:
- React.js & shadcn/ui
- Node.js & Express
- MongoDB
- Simulated Blockchain (SHA-256)
- Tailwind CSS

---

**Ready to present! Good luck with your hackathon! 🚀**

**Remember:** This is a fully functional MVP that demonstrates real blockchain verification without the complexity. Perfect for showing judges innovation + execution!
