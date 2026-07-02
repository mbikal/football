import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MatchList from "../components/MatchList";

function Homepage() {
  useEffect(() => {
    // Dynamic SEO update
    document.title = "KissMyFootball - Football News & World Cup Live Streams";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Watch free live football streaming, World Cup live matches, get latest football news, transfer rumors, and match schedules on KissMyFootball.');
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'world cup live, football news, live football streaming, soccer streams, kissmyfootball');
    }

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "KissMyFootball",
      "url": window.location.origin,
      "description": "Watch free live football streaming, World Cup live matches, get latest football news, transfer rumors, and match schedules on KissMyFootball."
    };
    
    const scriptLD = document.createElement('script');
    scriptLD.type = 'application/ld+json';
    scriptLD.textContent = JSON.stringify(structuredData);
    document.head.appendChild(scriptLD);

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
      if (document.head.contains(scriptLD)) {
        document.head.removeChild(scriptLD);
      }
      try {
        if (document.body.contains(script1)) {
          document.body.removeChild(script1);
        }
        if (document.body.contains(script2)) {
          document.body.removeChild(script2);
        }
      } catch (err) {
        console.warn("Error cleaning up ad script:", err);
      }
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
