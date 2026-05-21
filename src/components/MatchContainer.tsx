import TeamInfo from "./TeamInfo";
import styles from "./MatchContainer.module.css";
import { useNavigate } from "react-router";
function MatchContainer() {
  const navigate = useNavigate();
  function handleClick(){
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
function formatLocalTime(dateString) {
  return new Date(dateString).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}
export default MatchContainer;
