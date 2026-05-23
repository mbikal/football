import team1 from "../assets/realmadrid.png";
import team2 from "../assets/althletic.png";
import styles from "./TeamInfo.module.css";
function TeamInfo({ ishome }) {
  return (
    <div className={styles.teamInfo}>
      {ishome ? (
        <>
          <img src={team1} alt="Al nassr" />
          <h3>Al Nassr</h3>
        </>
      ) : (
        <>
          <h3>Damac</h3>
          <img src={team2} alt="Damac" />
        </>
      )}
    </div>
  );
}
export default TeamInfo;
