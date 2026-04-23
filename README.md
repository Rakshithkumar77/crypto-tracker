# 🪙 CryptoTrack – Cryptocurrency Price Tracker Dashboard

A full-stack, production-ready web app for tracking live cryptocurrency prices with user authentication, watchlists, price charts, and pagination.

---

## 🗂 Project Structure

```
Project/
├── backend/                   # Node.js + Express API
│   ├── prisma/
│   │   └── schema.prisma      # DB schema (MySQL via Prisma)
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/       # auth, crypto, watchlist
│   │   ├── middleware/        # auth (JWT), error handler
│   │   ├── routes/            # auth, crypto, watchlist
│   │   ├── services/          # coingecko, cache
│   │   ├── utils/response.util.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/                  # React + Vite SPA
│   ├── src/
│   │   ├── components/        # Navbar, CoinCard, SearchBar, PriceChart, Pagination, Loader
│   │   ├── context/           # AuthContext
│   │   ├── hooks/             # useCoins, useWatchlist
│   │   ├── pages/             # Dashboard, CoinDetail, Watchlist, Auth
│   │   ├── services/          # api, auth, crypto, watchlist
│   │   ├── styles/index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
└── shared/
    └── types.js               # JSDoc types + shared constants
```

---

## ⚙️ Prerequisites

| Tool      | Version  |
|-----------|----------|
| Node.js   | >= 18    |
| MySQL     | >= 8.0   |
| npm       | >= 9     |

---

## 🛠 Setup Instructions

### 1. Clone / open the project

```bash
cd Project
```

### 2. MySQL Database Setup

```sql
-- In MySQL shell or Workbench
CREATE DATABASE crypto_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ctuser'@'localhost' IDENTIFIED BY 'StrongPassword123!';
GRANT ALL PRIVILEGES ON crypto_tracker.* TO 'ctuser'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configure Backend

```bash
cd backend
copy .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="mysql://ctuser:StrongPassword123!@localhost:3306/crypto_tracker"
JWT_SECRET=replace_with_a_long_random_secret
PORT=5000
```

### 4. Install Backend Dependencies & Run Migrations

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Configure Frontend

```bash
cd ../frontend
copy .env.example .env
```

The default `.env` (`VITE_API_BASE_URL=http://localhost:5000/api`) works out of the box.

### 6. Install Frontend Dependencies

```bash
npm install
```

---

## 🚀 Running the App

Open **two terminals**:

**Terminal 1 – Backend**
```bash
cd backend
npm run dev
```
API runs at: `http://localhost:5000`

**Terminal 2 – Frontend**
```bash
cd frontend
npm run dev
```
App runs at: `http://localhost:5173`

---

## 🔌 API Reference

All responses follow:
```json
{ "success": true, "message": "...", "data": {} }
```

| Method | Endpoint                   | Auth | Description            |
|--------|----------------------------|------|------------------------|
| POST   | /api/auth/signup           | ❌   | Register new user      |
| POST   | /api/auth/login            | ❌   | Login, returns JWT     |
| GET    | /api/auth/me               | ✅   | Current user profile   |
| GET    | /api/crypto/markets        | ❌   | Paginated coin list    |
| GET    | /api/crypto/search?q=      | ❌   | Search coins           |
| GET    | /api/crypto/trending       | ❌   | Trending coins         |
| GET    | /api/crypto/coins/:id      | ❌   | Coin detail            |
| GET    | /api/crypto/coins/:id/chart| ❌   | Price chart data       |
| GET    | /api/watchlist             | ✅   | Get user watchlist     |
| POST   | /api/watchlist             | ✅   | Add coin to watchlist  |
| DELETE | /api/watchlist/:coinId     | ✅   | Remove from watchlist  |
| GET    | /api/watchlist/check/:coinId | ✅ | Check watchlist status |

---

## 🔒 Authentication

Uses **JWT Bearer tokens**.  
After login/signup, the token is stored in `localStorage` and attached automatically by the Axios interceptor.

---

## 🧠 Caching

In-memory cache via `node-cache`:
| Data type | Default TTL |
|-----------|-------------|
| Prices    | 60s         |
| Charts    | 300s        |
| Search    | 600s        |

Configure via `.env` variables.

---

## 🌐 CoinGecko API

The app uses the **free CoinGecko public API** by default.  
To use a demo API key (higher rate limits), set `COINGECKO_API_KEY` in backend `.env`.

---

## 📦 Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React 18, Vite, Chart.js    |
| Routing    | React Router v6             |
| HTTP       | Axios                       |
| Backend    | Node.js, Express            |
| ORM        | Prisma                      |
| Database   | MySQL 8                     |
| Auth       | JWT + bcryptjs              |
| Styling    | Vanilla CSS (dark design)   |

---

## 🎨 Features

- ✅ Real-time crypto prices (CoinGecko API)
- ✅ Debounced coin search
- ✅ Interactive price charts (1d / 7d / 30d / 90d / 1y)
- ✅ User authentication (JWT)
- ✅ Per-user Watchlist (DB-persisted)
- ✅ Pagination (20 coins/page)
- ✅ In-memory caching
- ✅ Dark premium UI with animations
- ✅ Responsive & mobile-friendly

---

## 🧪 Database Troubleshooting

```bash
# Reset and re-run migrations
npx prisma migrate reset

# Inspect DB via Prisma Studio
npx prisma studio

# Regenerate Prisma client after schema changes
npx prisma generate
```
