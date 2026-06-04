import styles from "./TeamInfo.module.css";

type TeamProps = {
  teamImg: string;
  teamName: string;
};

export function HomeTeam({ teamImg, teamName }: TeamProps) {
  return (
    <div className={styles.teamInfo}>
      <img 
        src={teamImg} 
        alt={teamName}
        onError={(e) => {
          e.currentTarget.src = "/logo.png"; // Fallback to default logo
        }}
      />
      <h3 className={styles.teamName}>{teamName}</h3>
    </div>
  );
}

export function AwayTeam({ teamImg, teamName }: TeamProps) {
  return (
    <div className={styles.teamInfo}>
      <h3 className={styles.teamName}>{teamName}</h3>
      <img 
        src={teamImg} 
        alt={teamName}
        onError={(e) => {
          e.currentTarget.src = "/logo.png"; // Fallback to default logo
        }}
      />
    </div>
  );
}
