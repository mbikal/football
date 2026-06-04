import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MatchList from "../components/MatchList";

function Homepage() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : '070cc7f3560099e01301ff26cf81dc4b',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;

    const script2 = document.createElement("script");
    script2.src =
      "https://manhoodinvoluntaryplash.com/070cc7f3560099e01301ff26cf81dc4b/invoke.js";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      color: 'white'
    }}>
      <Header />
      <main style={{ 
        flex: 1, 
        padding: 'clamp(20px, 5vw, 40px) clamp(15px, 4vw, 20px)',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <MatchList />
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
