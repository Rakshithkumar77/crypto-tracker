import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Shared app components
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';

// Pages — Landing (standalone, own navbar/footer)
import Landing from './pages/Landing/Landing';

// Pages — App (use shared Navbar)
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import CoinDetail from './pages/CoinDetail/CoinDetail';
import Watchlist from './pages/Watchlist/Watchlist';
import Pricing from './pages/Pricing/Pricing';
import FAQ from './pages/FAQ/FAQ';
import TradingBots from './pages/TradingBots/TradingBots';
import ClickSpark from './components/ClickSpark/ClickSpark';

/* ── Auth Guards ───────────────────────────────── */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loader fullscreen />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loader fullscreen />;
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

/* ── App Layout (shared Navbar for all app pages) ── */
function AppLayout() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

/* ── Root App ──────────────────────────────────── */
export default function App() {
  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Routes>
        {/* Landing — standalone, has its own LandingNavbar + Footer */}
        <Route path="/" element={<Landing />} />

        {/* All other pages — use shared Navbar via AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coin/:id"  element={<CoinDetail />} />

          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <Watchlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <Signup />
              </PublicOnlyRoute>
            }
          />

          {/* New landing-linked pages */}
          <Route path="/pricing"      element={<Pricing />} />
          <Route path="/faq"          element={<FAQ />} />
          <Route path="/trading-bots" element={<TradingBots />} />
        </Route>

        {/* Catch-all → Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ClickSpark>
  );
}
