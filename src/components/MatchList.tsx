import { useState, useEffect } from "react";
import MatchContainer from "./MatchContainer";
import { getMatches } from "../data/matches";
import type { Match } from "../types/match";

function MatchList() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    setMatches(getMatches());
    
    // Listen for storage changes to update in real-time
    const handleStorageChange = () => {
      setMatches(getMatches());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handleCustomUpdate = () => {
      setMatches(getMatches());
    };
    
    window.addEventListener('matchesUpdated', handleCustomUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('matchesUpdated', handleCustomUpdate);
    };
  }, []);

  return (
    <div>
      <h2 style={{
        fontSize: 'clamp(24px, 4vw, 36px)',
        fontWeight: '700',
        marginBottom: '32px',
        textAlign: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        textTransform: 'uppercase',
        letterSpacing: '2px',
        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Live Matches
      </h2>

      {matches.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '18px'
        }}>
          No matches available. Please check back later.
        </div>
      ) : (
        matches.map((match) => (
          <MatchContainer
            key={match.id}
            matchDate={match.matchDate}
            iframeUrl={match.iframeUrl}
            team1img={match.team1img}
            team2img={match.team2img}
            team1name={match.team1name}
            team2name={match.team2name}
          />
        ))
      )}
    </div>
  );
}

export default MatchList;
