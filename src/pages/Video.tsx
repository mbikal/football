import { useEffect, useRef, useState, type CSSProperties } from "react";
import Hls from "hls.js";

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  const streamUrl =
    "https://lbgo.bozztv.com/ssh101/ssh101/mylive2026europ/playlist.m3u8";

  // Nepal time
  const matchDate = "2026-05-21T23:45:00+05:45";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [matchStarted, setMatchStarted] = useState(false);
  const [levels, setLevels] = useState<Hls["levels"]>([]);
  const [currentLevel, setCurrentLevel] = useState(-1);

  const initPlayer = () => {
    const video = videoRef.current;
    if (!video) return;

    setLoading(true);
    setError(false);

    // destroy old instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Safari native HLS
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      setLoading(false);
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
      });

      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        setLevels(hls.levels || []);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (!data.fatal) return;

        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.log("Network error - retrying...");
            hls.startLoad();
            break;

          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log("Media error - recovering...");
            hls.recoverMediaError();
            break;

          default:
            setError(true);
            setLoading(false);
            break;
        }
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(data.level);
      });
    } else {
      setError(true);
      setLoading(false);
    }
  };

  // Start automatically at match time
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    const updateTimer = () => {
      const now = new Date().getTime();
      const start = new Date(matchDate).getTime();
      const diff = start - now;

      // Match started
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        setMatchStarted(true);
        initPlayer();
        clearInterval(timer);
        return;
      }

      // Countdown
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

    updateTimer(); // first run
    timer = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timer);
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, []);

  const changeQuality = (level: number) => {
    if (!hlsRef.current) return;
    hlsRef.current.currentLevel = level;
    setCurrentLevel(level);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Live Stream Player</h2>

      <div style={styles.playerBox}>
        {!matchStarted ? (
          <div style={styles.overlay}>
            <div>Match starts in</div>
            <div style={styles.timer}>{timeLeft}</div>
          </div>
        ) : (
          <>
            {loading && <div style={styles.overlay}>Loading stream...</div>}

            {error && (
              <div style={styles.overlay}>
                Stream error
                <button style={styles.btn} onClick={initPlayer}>
                  Retry
                </button>
              </div>
            )}

            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              style={styles.video}
            />
          </>
        )}
      </div>

      {/* Controls */}
      {matchStarted && (
        <div style={styles.controls}>
          <button style={styles.btn} onClick={initPlayer}>
            Reload
          </button>

          {levels.length > 0 && (
            <select
              style={styles.select}
              value={currentLevel}
              onChange={(e) => changeQuality(Number(e.target.value))}
            >
              <option value={-1}>Auto</option>
              {levels.map((level, i) => (
                <option key={i} value={i}>
                  {level.height ? `${level.height}p` : `Quality ${i}`}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    background: "#000",
    minHeight: "100vh",
    color: "white",
    padding: 20,
    textAlign: "center",
  },
  title: {
    marginBottom: 15,
  },
  playerBox: {
    position: "relative",
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
    aspectRatio: "16/9",
    background: "#111",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  timer: {
    fontSize: 42,
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
    background: "rgba(0,0,0,0.7)",
    zIndex: 2,
    gap: 10,
    fontSize: 20,
  },
  controls: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  btn: {
    padding: "8px 12px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: 5,
  },
  select: {
    padding: 8,
  },
};
