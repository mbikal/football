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
      matchDate: "2026-06-31T21:40:00+05:45",
      iframeUrl:
        "https://socolivea.cv/truc-tiep/l1-vs-e3-h3-i3-j3-k3-01-07-2026-2300/",
      team1img: "/england.png",
      team2img: "/congo.png",
      team1name: "England",
      team2name: "DR Congo",
    },
    {
      id: "2",
      matchDate: "2026-06-01T01:40:00+05:45",
      iframeUrl:
        "https://socolivea.cv/truc-tiep/g1-vs-a3-e3-h3-i3-j3-02-07-2026-0300/",
      team1img: "/belgium.png",
      team2img: "/senegal.png",
      team1name: "Belgium",
      team2name: "Senegal",
    },
    {
      id: "3",
      matchDate: "2026-07-01T01:40:00+05:45",
      iframeUrl:
        "https://socolivea.cv/truc-tiep/usa-vs-bosnia-and-herzegovina-02-07-2026-0700/",
      team1img: "/usa.png",
      team2img: "/bosnia.png",
      team1name: "USA",
      team2name: "Bosnia and Herzegovina",
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
