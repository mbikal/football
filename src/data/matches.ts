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
      matchDate: "2026-06-20T22:45:00+05:45",
      iframeUrl: "https://ftmesc.blogspot.com/p/wc20.html?m=1",
      team1img: "/netherland.png",
      team2img: "/sweden.png",
      team1name: "Netherland",
      team2name: "Sweden",
    },
    {
      id: "2",
      matchDate: "2026-06-21T01:45:00+05:45",
      iframeUrl: "https://ftmesc.blogspot.com/p/wc5.html",
      team1img: "/germany.png",
      team2img: "/ivory.png",
      team1name: "Germany",
      team2name: "Ivory Coast",
    },
    {
      id: "3",
      matchDate: "2026-06-21T05:45:00+05:45",
      iframeUrl: "https://ftmesc.blogspot.com/p/wc5.html",
      team1img: "/ecuador.png",
      team2img: "/curacao.png",
      team1name: "Ecuador",
      team2name: "Curacao",
    },
    {
      id: "4",
      matchDate: "2026-06-21T09:45:00+05:45",
      iframeUrl: "https://ftmesc.blogspot.com/p/wc5.html",
      team1img: "/tunisia.png",
      team2img: "/japan.png",
      team1name: "Tunisia",
      team2name: "Japan",
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
