import type { Match } from "../types/match";

const STORAGE_KEY = "football_matches";
const STORAGE_VERSION_KEY = "football_matches_version";

export const getMatches = (): Match[] => {
  if (typeof window === "undefined") return [];

  // Default matches if none stored - all for today (June 6) with different times
  const defaultMatches: Match[] = [
    {
      id: "1",
      matchDate: "2026-07-07T21:40:00+05:45",
      iframeUrl:
        "https://socoliven.cv/truc-tiep/winner-r32-match-14-vs-winner-r32-match-16-07-07-2026-2300/",
      team1img: "/argentina.png",
      team2img: "/egypt.png",
      team1name: "Argeentina",
      team2name: "Egypt",
    },
    {
      id: "2",
      matchDate: "2026-07-08T01:40:00+05:45",
      iframeUrl:
        "https://socoliven.cv/truc-tiep/winner-r32-match-13-vs-winner-r32-match-15-08-07-2026-0300/",
      team1img: "/swiss.png",
      team2img: "/colombia.png",
      team1name: "Switzerland",
      team2name: "Colombia",
    },
  ];

  // Fingerprint the default matches to detect updates in the codebase
  const defaultMatchesStr = JSON.stringify(defaultMatches);
  const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);

  // If codebase default matches have updated, overwrite stored matches
  if (storedVersion !== defaultMatchesStr) {
    console.log(
      "getMatches: Codebase default matches updated. Resetting localStorage matches.",
    );
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
      console.error(
        "getMatches: Error parsing stored matches, falling back to defaults",
        e,
      );
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
