import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";

const Homepage = lazy(() => import("./pages/Homepage"));
const Player = lazy(() => import("./pages/Player"));
const Admin = lazy(() => import("./pages/Admin"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const News = lazy(() => import("./pages/News"));
const VideoPage = lazy(() => import("./pages/Video"));

function AdminLogin() {
  return <LoginForm />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={
          <div style={{
            minHeight: '100vh',
            background: '#0f172a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '3px solid rgba(255, 255, 255, 0.2)',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="player" element={<Player />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="news" element={<News />} />
            <Route path="video" element={<VideoPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
