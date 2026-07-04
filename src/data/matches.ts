import type { Match } from "../types/match";

const STORAGE_KEY = "football_matches";
const STORAGE_VERSION_KEY = "football_matches_version";

export const getMatches = (): Match[] => {
  if (typeof window === "undefined") return [];

  // Default matches if none stored - all for today (June 6) with different times
  const defaultMatches: Match[] = [
    {
      id: "1",
      matchDate: "2026-07-04T22:40:00+05:45",
      iframeUrl:
        "https://socoliveb.cv/truc-tiep/south-africa-canada-vs-netherlands-morocco-05-07-2026-0000/",
      team1img: "/canada.png",
      team2img: "/morocco.png",
      team1name: "Canada",
      team2name: "Morocco",
    },
    {
      id: "2",
      matchDate: "2026-07-05T02:40:00+05:45",
      iframeUrl:
        "https://socoliveb.cv/truc-tiep/germany-paraguay-vs-france-sweden-05-07-2026-0400/?blv=118206",
      team1img: "/paraguay.png",
      team2img: "/france.png",
      team1name: "Paraguay",
      team2name: "France",
    },
  ];

  // Fingerprint the default matches to detect updates in the codebase
  const defaultMatchesStr = JSON.stringify(defaultMatches);
  const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);

  // If codebase default matches have updated, overwrite stored matches
  if (storedVersion !== defaultMatchesStr) {
    console.log("getMatches: Codebase default matches updated. Resetting localStorage matches.");
    localStorage.setItem(STORAGE_KEY, defaultMatchesStr);
    localStorage.setItem(STORAGE_VERSION_KEY, defaultMatchesStr);
    return defaultMatches;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      console.log("getMatches: Returning stored matches:", parsed);
      return parsed;
    } catch (e) {
      console.error("getMatches: Error parsing stored matches, falling back to defaults", e);
    }
  }

  console.log("getMatches: No stored data, using default matches");
  localStorage.setItem(STORAGE_KEY, defaultMatchesStr);
  localStorage.setItem(STORAGE_VERSION_KEY, defaultMatchesStr);
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
