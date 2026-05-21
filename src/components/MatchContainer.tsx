
import TeamInfo from "./TeamInfo";
import styles from "./MatchContainer.module.css";

const ADSTERRA_LINK =
  "https://www.effectivecpmnetwork.com/vx44kz8er?key=9ad95668ee33cb1db5f98a781b111c37";
const VIDEO_PAGE_LINK = "https://ssh101.com/live/mylive2026europ"; 
function MatchContainer() {


  function handleClick(): void {
    // 1. Open Adsterra (monetization)
    window.open(ADSTERRA_LINK, "_blank", "noopener,noreferrer");

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
