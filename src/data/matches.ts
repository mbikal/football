import type { Match } from "../types/match";

const STORAGE_KEY = "football_matches";
const STORAGE_VERSION_KEY = "football_matches_version";

export const getMatches = (): Match[] => {
  if (typeof window === "undefined") return [];

  // Force clear localStorage for debugging - remove this after fixing
  console.log("getMatches: Force clearing localStorage for debugging");
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_VERSION_KEY);

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    console.log("getMatches: Returning stored matches:", parsed);
    return parsed;
  }

  console.log("getMatches: No stored data, using default matches");
  // Default matches if none stored - all for today (June 6) with different times
  const defaultMatches: Match[] = [
    {
      id: "1",
      matchDate: "2026-06-25T00:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/switzerland-vs-canada-25-06-2026-0200/",
      team1img: "/swiss.png",
      team2img: "/canada.png",
      team1name: "Switzerland",
      team2name: "Canada",
    },
    {
      id: "2",
      matchDate: "2026-06-25T00:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/bosnia-and-herzegovina-vs-qatar-25-06-2026-0200/",
      team1img: "/bosnia.png",
      team2img: "/qatar.png",
      team1name: "Bosnia",
      team2name: "Qatar",
    },
    {
      id: "3",
      matchDate: "2026-06-25T03:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/morocco-vs-haiti-25-06-2026-0500/",
      team1img: "/morocco.png",
      team2img: "/haiti.png",
      team1name: "Morocco",
      team2name: "Haiti",
    },
    {
      id: "4",
      matchDate: "2026-06-25T03:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/scotland-vs-brazil-25-06-2026-0500/",
      team1img: "/scotland.png",
      team2img: "/brasil.png",
      team1name: "Scotland",
      team2name: "Brazil",
    },
    {
      id: "5",
      matchDate: "2026-06-25T06:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/south-africa-vs-south-korea-25-06-2026-0800/",
      team1img: "/southafrica.png",
      team2img: "/southKorea.png",
      team1name: "South Africa",
      team2name: "South Korea",
    },
    {
      id: "6",
      matchDate: "2026-06-25T06:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/czechia-vs-mexico-25-06-2026-0800/",
      team1img: "/czech.png",
      team2img: "/mexico.png",
      team1name: "Czechia",
      team2name: "Mexico",
    },
    {
      id: "6",
      matchDate: "2026-06-25T06:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/czechia-vs-mexico-25-06-2026-0800/",
      team1img: "/czech.png",
      team2img: "/mexico.png",
      team1name: "Czechia",
      team2name: "Mexico",
    },
    {
      id: "7",
      matchDate: "2026-06-26T01:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/curacao-vs-cote-divoire-26-06-2026-0300/",
      team1img: "/curacao.png",
      team2img: "/ivory.png",
      team1name: "Curacao",
      team2name: "Ivory Coast",
    },
    {
      id: "8",
      matchDate: "2026-06-25T01:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/ecuador-vs-germany-26-06-2026-0300/",
      team1img: "/ecuador.png",
      team2img: "/germany.png",
      team1name: "Curacao",
      team2name: "Ivory Coast",
    },
    {
      id: "9",
      matchDate: "2026-06-25T04:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/tunisia-vs-netherlands-26-06-2026-0600/",
      team1img: "/tunisia.png",
      team2img: "/netherland.png",
      team1name: "Tunisia",
      team2name: "Netherlands",
    },
    {
      id: "10",
      matchDate: "2026-06-25T04:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/japan-vs-sweden-26-06-2026-0600/",
      team1img: "/japan.png",
      team2img: "/sweden.png",
      team1name: "Japan",
      team2name: "Sweden",
    },
    {
      id: "11",
      matchDate: "2026-06-25T07:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/turkiye-vs-usa-26-06-2026-0900/",
      team1img: "/turkiye.png",
      team2img: "/usa.png",
      team1name: "Turkiye",
      team2name: "USA",
    },
    {
      id: "12",
      matchDate: "2026-06-25T07:40:00+05:45",
      iframeUrl:
        "https://socolive25.cv/truc-tiep/paraguay-vs-australia-26-06-2026-0900/",
      team1img: "/paraguay.png",
      team2img: "/australia.png",
      team1name: "Paraguay",
      team2name: "Australia",
    },
  ];

  console.log("getMatches: Setting default matches:", defaultMatches);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMatches));
  console.log("getMatches: Returning default matches:", defaultMatches);
  return defaultMatches;
};

export const addMatch = (match: Omit<Match, "id">): Match => {
  const matches = getMatches();
  const newMatch: Match = {
    ...match,
    id: Date.now().toString(),
  };

  matches.push(newMatch);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));

  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new CustomEvent("matchesUpdated"));

  return newMatch;
};

export const removeMatch = (id: string): boolean => {
  const matches = getMatches();
  const filteredMatches = matches.filter((match) => match.id !== id);

  if (filteredMatches.length < matches.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMatches));

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent("matchesUpdated"));

    return true;
  }

  return false;
};

export const updateMatch = (
  id: string,
  updates: Partial<Omit<Match, "id">>,
): boolean => {
  const matches = getMatches();
  const matchIndex = matches.findIndex((match) => match.id === id);

  if (matchIndex !== -1) {
    matches[matchIndex] = { ...matches[matchIndex], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
    return true;
  }

  return false;
};
