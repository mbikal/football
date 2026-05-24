import { HomeTeam, AwayTeam } from "./TeamInfo";
import styles from "./MatchContainer.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADSTERRA_LINK =
  "https://www.effectivecpmnetwork.com/vx44kz8er?key=9ad95668ee33cb1db5f98a781b111c37";

type MatchProps = {
  matchDate: string;
  iframeUrl: string;
  team1img: string;
  team2img: string;
  team1name: string;
  team2name: string;
};

function MatchContainer({
  matchDate,
  iframeUrl,
  team1img,
  team2img,
  team1name,
  team2name,
}: MatchProps) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(0);

  function handleClick(): void {
    if (clicked === 0) {
      setClicked(1);
      window.open(ADSTERRA_LINK, "_blank", "noopener,noreferrer");
    }

    navigate("/video", {
      state: {
        matchDate,
        iframeUrl,
        team1name,
        team2name,
        team1img,
        team2img,
      },
    });
  }

  return (
    <div className={styles.box} onClick={handleClick}>
      <HomeTeam teamImg={team1img} teamName={team1name} />

      <div className={styles.matchTime}>{formatLocalTime(matchDate)}</div>

      <AwayTeam teamImg={team2img} teamName={team2name} />
    </div>
  );
}

function formatLocalTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default MatchContainer;
