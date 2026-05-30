import MatchContainer from "./MatchContainer";
import brightonLogo from "../assets/psg.png";
import unitedLogo from "../assets/arsenal.png";

function MatchList() {
  return (
    <div>
      <h2>Match List</h2>

      <MatchContainer
        matchDate="2026-05-30T21:45:00+05:45"
        iframeUrl="https://securedq.blogspot.com/p/6.html"
        team1img={brightonLogo}
        team2img={unitedLogo}
        team1name="PSG"
        team2name="Arsenal"
      />
    </div>
  );
}

export default MatchList;
