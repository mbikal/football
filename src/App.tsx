import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Player from "./pages/Player";
import Admin from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import VideoPage from "./pages/Video";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="admin" element={<Admin />} />
          <Route path="player" element={<Player />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="news" element={<News />} />
          <Route path="video" element={<VideoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
