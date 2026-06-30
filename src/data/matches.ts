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
      matchDate: "2026-06-30T22:40:00+05:45",
      iframeUrl: "https://socolivea.cv/truc-tiep/e2-vs-i2-01-07-2026-0000/",
      team1img: "/ivory.png",
      team2img: "/norway.png",
      team1name: "Ivory Coast",
      team2name: "Norway",
    },
    {
      id: "2",
      matchDate: "2026-06-31T02:10:00+05:45",
      iframeUrl:
        "https://socolivea.cv/truc-tiep/i1-vs-c3-d3-f3-g3-h3-01-07-2026-0400/",
      team1img: "/france.png",
      team2img: "/sweden.png",
      team1name: "France",
      team2name: "Sweden",
    },
    {
      id: "3",
      matchDate: "2026-06-31T06:40:00+05:45",
      iframeUrl:
        "https://socolivea.cv/truc-tiep/mexico-vs-c3-e3-f3-h3-i3-01-07-2026-0800/",
      team1img: "/mexico.png",
      team2img: "/ecuador.png",
      team1name: "Mexico",
      team2name: "Ecuador",
    },
    {
      id: "4",
      matchDate: "2026-06-31T22:40:00+05:45",
      iframeUrl:
        "https://socolivea.cv/truc-tiep/l1-vs-e3-h3-i3-j3-k3-01-07-2026-2300/",
      team1img: "/england.png",
      team2img: "/congo.png",
      team1name: "England",
      team2name: "DR Congo",
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
