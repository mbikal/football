import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import Player from "./pages/Player";
import Admin from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import VideoPage from "./pages/Video";
import LoginForm from "./components/LoginForm";

function AdminLogin() {
  return <LoginForm />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="player" element={<Player />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="news" element={<News />} />
          <Route path="video" element={<VideoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
