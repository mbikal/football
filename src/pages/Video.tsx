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

  // ✅ AD SCRIPT (bottom banner)
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

  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }

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

    return () => clearInterval(timer);
  }, [state, navigate]);

  if (!state) return null;

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
