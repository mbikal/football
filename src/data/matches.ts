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
      matchDate: "2026-06-27T00:40:00+05:45",
      iframeUrl:
        "https://socolive27.cv/truc-tiep/norway-vs-france-27-06-2026-0200/",
      team1img: "/norway.png",
      team2img: "/france.png",
      team1name: "Norway",
      team2name: "France",
    },
    {
      id: "2",
      matchDate: "2026-06-27T00:40:00+05:45",
      iframeUrl:
        "https://socolive27.cv/truc-tiep/senegal-vs-iraq-27-06-2026-0200/",
      team1img: "/senegal.png",
      team2img: "/iraq.png",
      team1name: "Senegal",
      team2name: "Iraq",
    },
    {
      id: "3",
      matchDate: "2026-06-27T05:40:00+05:45",
      iframeUrl:
        "https://socolive27.cv/truc-tiep/senegal-vs-iraq-27-06-2026-0200/",
      team1img: "/cape.png",
      team2img: "/saudi.png",
      team1name: "Cape Verde",
      team2name: "Saudi Arabia",
    },
    {
      id: "4",
      matchDate: "2026-06-27T05:40:00+05:45",
      iframeUrl:
        "https://socolive27.cv/truc-tiep/uruguay-vs-spain-27-06-2026-0700/",
      team1img: "/uruguay.png",
      team2img: "/spain.png",
      team1name: "Uruguay",
      team2name: "Spain",
    },
    {
      id: "5",
      matchDate: "2026-06-27T08:40:00+05:45",
      iframeUrl:
        "https://socolive27.cv/truc-tiep/egypt-vs-ir-iran-27-06-2026-1000/",
      team1img: "/epgyt.png",
      team2img: "/iran.png",
      team1name: "Egypt",
      team2name: "Iran",
    },
    {
      id: "6",
      matchDate: "2026-06-27T08:40:00+05:45",
      iframeUrl:
        "https://socolive27.cv/truc-tiep/new-zealand-vs-belgium-27-06-2026-1000/",
      team1img: "/newzealand.png",
      team2img: "/belgium.png",
      team1name: "New Zealand",
      team2name: "Belgium",
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
