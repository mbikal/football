
import TeamInfo from "./TeamInfo";
import styles from "./MatchContainer.module.css";
import React, { useState } from "react";

const ADSTERRA_LINK =
  "https://www.effectivecpmnetwork.com/vx44kz8er?key=9ad95668ee33cb1db5f98a781b111c37";
const VIDEO_PAGE_LINK = "https://ssh101.com/live/mylive2026europ"; 
function MatchContainer() {

const [clicked, setClicked] =useState(false);
  function handleClick(): void {
    if (clicked){
      setClicked(true);
      window.open(ADSTERRA_LINK, "_blank", "noopener,noreferrer");
    } // Prevent multiple clicks
    // 1. Open Adsterra (monetization)
    

    // 2. Redirect to video page
     window.open(VIDEO_PAGE_LINK, "_blank", "noopener,noreferrer");
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
