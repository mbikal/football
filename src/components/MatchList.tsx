import MatchContainer from "./MatchContainer";
import liverpoolLogo from "../assets/liverpool.png";
import arsenalLogo from "../assets/arsenal.png";
import brightonLogo from "../assets/brighton.png";
import brentfordLogo from "../assets/brentford.png";
import cityLogo from "../assets/city.png";
import astonvilla from "../assets/astonvilla.png";
import unitedLogo from "../assets/united.png";
import palaceLogo from "../assets/palace.png";

function MatchList() {
  return (
    <div>
      <h2>Match List</h2>

      <MatchContainer
        matchDate="2026-05-24T20:45:00+05:45"
        iframeUrl="https://securedq.blogspot.com/p/6.html"
        team1img={brightonLogo}
        team2img={unitedLogo}
        team1name="Brighton"
        team2name="Manchester United"
      />

      <MatchContainer
        matchDate="2026-05-24T20:45:00+05:45"
        iframeUrl="https://securedq.blogspot.com/p/6.html"
        team1img={palaceLogo}
        team2img={arsenalLogo}
        team1name="Crystal Palace"
        team2name="Arsenal"
      />

      <MatchContainer
        matchDate="2026-05-24T20:45:00+05:45"
        iframeUrl="https://securedq.blogspot.com/p/7.html"
        team1img={liverpoolLogo}
        team2img={brentfordLogo}
        team1name="Liverpool"
        team2name="Brentford"
      />

      <MatchContainer
        matchDate="2026-05-24T20:45:00+05:45"
        iframeUrl="https://securedq.blogspot.com/p/8.html"
        team1img={cityLogo}
        team2img={astonvilla}
        team1name="Man City"
        team2name="Aston Villa"
      />
    </div>
  );
}

export default MatchList;
