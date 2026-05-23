
import TeamInfo from "./TeamInfo";
import styles from "./MatchContainer.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

const ADSTERRA_LINK =
  "https://www.effectivecpmnetwork.com/vx44kz8er?key=9ad95668ee33cb1db5f98a781b111c37";



function MatchContainer() {
  const navigate = useNavigate();

const [clicked, setClicked] =useState(0);
  function handleClick(): void {
    if (clicked === 0){
      setClicked(1);
      window.open(ADSTERRA_LINK, "_blank", "noopener,noreferrer");
    } // Prevent multiple clicks
    // 2. Redirect to video page
     navigate("/video");
  }

  return (
    <div className={styles.box} onClick={handleClick}>
      <TeamInfo ishome={true} />

      <div className={styles.matchTime}>
        {formatLocalTime("2026-05-21T23:45:00+05:45")}
      </div>

      <TeamInfo ishome={false} />
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
