import { useEffect, useState, type CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type MatchState = {
  matchDate: string;
  iframeUrl: string;
};

export default function VideoPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as MatchState | null;

  const [timeLeft, setTimeLeft] = useState("");
  const [matchStarted, setMatchStarted] = useState(false);

  // ✅ AD SCRIPT (bottom banner) with error handling
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
    script2.crossOrigin = "anonymous";

    // Add timeout to prevent hanging
    const timeout = setTimeout(() => {
      console.warn("Ad script loading timeout - preventing errors");
    }, 5000);

    // Enhanced error handling for the script
    script2.onload = () => {
      clearTimeout(timeout);
      console.log("Ad script loaded successfully");
    };

    script2.onerror = () => {
      clearTimeout(timeout);
      console.warn("Ad script failed to load - this is expected behavior");
    };

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      clearTimeout(timeout);
      try {
        if (document.body.contains(script1)) {
          document.body.removeChild(script1);
        }
        if (document.body.contains(script2)) {
          document.body.removeChild(script2);
        }
      } catch (error) {
        console.warn("Error removing ad scripts:", error);
      }
    };
  }, []);

  useEffect(() => {
    if (!state) {
      document.title = "Watch Live Football Streams - World Cup Live | KissMyFootball";
      return;
    }

    const { team1name, team2name, matchDate } = state as any;
    const matchName = `${team1name} vs ${team2name}`;
    
    // Dynamic SEO updates
    document.title = `Watch ${matchName} Live Stream - World Cup Live | KissMyFootball`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Watch free live football streaming for ${matchName}. Stay tuned for World Cup live streams, live soccer matches, and football news on KissMyFootball.`);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', `${team1name} vs ${team2name} live, watch ${team1name} online, world cup live stream, free live football, kissmyfootball`);
    }

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      "name": `${team1name} vs ${team2name} Live Stream`,
      "startDate": new Date(matchDate).toISOString(),
      "description": `Watch free live stream of ${team1name} vs ${team2name} match on KissMyFootball.`,
      "sport": "https://en.wikipedia.org/wiki/Association_football",
      "competitor": [
        {
          "@type": "SportsTeam",
          "name": team1name
        },
        {
          "@type": "SportsTeam",
          "name": team2name
        }
      ]
    };

    const scriptLD = document.createElement('script');
    scriptLD.type = 'application/ld+json';
    scriptLD.textContent = JSON.stringify(structuredData);
    document.head.appendChild(scriptLD);

    let timer: ReturnType<typeof setInterval>;

    const updateTimer = () => {
      const now = new Date().getTime();
      const start = new Date(state.matchDate).getTime();
      const diff = start - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        setMatchStarted(true);
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0",
        )}:${String(seconds).padStart(2, "0")}`,
      );
    };

    updateTimer();
    timer = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timer);
      if (document.head.contains(scriptLD)) {
        document.head.removeChild(scriptLD);
      }
    };
  }, [state, navigate]);

  if (!state) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '20px'
        }}>
          ⚽
        </div>
        <h1 style={{
          fontSize: '32px',
          marginBottom: '16px',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          No Match Selected
        </h1>
        <p style={{
          fontSize: '18px',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '32px',
          maxWidth: '500px',
          lineHeight: '1.6'
        }}>
          Please select a match from the homepage to view the live stream.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }}
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Live Match</h2>

      <div style={styles.playerBox}>
        {!matchStarted ? (
          <div style={styles.overlay}>
            <div>Match starts in</div>
            <div style={styles.timer}>{timeLeft}</div>
          </div>
        ) : (
          <iframe
            title="Live Stream"
            src={state.iframeUrl}
            style={styles.iframe}
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    background: "#000",
    minHeight: "100vh",
    color: "white",
    padding: 0,
    margin: 0,
    position: "relative",
    overflow: "hidden",
  },
  title: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    margin: 0,
    fontSize: 24,
    fontWeight: "bold",
    background: "rgba(0,0,0,0.7)",
    padding: "10px 20px",
    borderRadius: 8,
    backdropFilter: "blur(10px)",
  },
  playerBox: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "#000",
    overflow: "hidden",
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    border: "none",
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.9)",
    zIndex: 2,
    gap: 15,
    fontSize: 24,
  },
};
