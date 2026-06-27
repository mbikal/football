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
      matchDate: "2026-06-28T02:40:00+05:45",
      iframeUrl:
        "https://socolive28.cv/truc-tiep/panama-vs-england-28-06-2026-0400/",
      team1img: "/panama.png",
      team2img: "/england.png",
      team1name: "Panama",
      team2name: "England",
    },
    {
      id: "2",
      matchDate: "2026-06-28T02:40:00+05:45",
      iframeUrl:
        "https://socolive28.cv/truc-tiep/croatia-vs-ghana-28-06-2026-0400/",
      team1img: "/croatia.png",
      team2img: "/ghana.png",
      team1name: "Croatia",
      team2name: "Ghana",
    },
    {
      id: "3",
      matchDate: "2026-06-28T05:40:00+05:45",
      iframeUrl:
        "https://socolive28.cv/truc-tiep/colombia-vs-portugal-28-06-2026-0630/",
      team1img: "/colombia.png",
      team2img: "/portugal.png",
      team1name: "Colombia",
      team2name: "Portugal",
    },
    {
      id: "4",
      matchDate: "2026-06-27T05:40:00+05:45",
      iframeUrl:
        "https://socolive28.cv/truc-tiep/democratic-republic-of-the-congo-vs-uzbekistan-28-06-2026-0630/",
      team1img: "/congo.png",
      team2img: "/uzbekistan.png",
      team1name: "DR Congo",
      team2name: "Uzbekistan",
    },
    {
      id: "5",
      matchDate: "2026-06-28T07:40:00+05:45",
      iframeUrl:
        "https://socolive28.cv/truc-tiep/jordan-vs-argentina-28-06-2026-0900/",
      team1img: "/jordan.png",
      team2img: "/argentina.png",
      team1name: "Jordan",
      team2name: "Argentina",
    },
    {
      id: "6",
      matchDate: "2026-06-28T07:40:00+05:45",
      iframeUrl:
        "https://socolive28.cv/truc-tiep/algeria-vs-austria-28-06-2026-0900/",
      team1img: "/algeria.png",
      team2img: "/austria.png",
      team1name: "Algeria",
      team2name: "Austria",
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
