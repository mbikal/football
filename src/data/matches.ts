import type { Match } from "../types/match";

const STORAGE_KEY = "football_matches";
const STORAGE_VERSION_KEY = "football_matches_version";

export const getMatches = (): Match[] => {
  if (typeof window === "undefined") return [];
  
  // Force clear localStorage for debugging - remove this after fixing
  console.log('getMatches: Force clearing localStorage for debugging');
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_VERSION_KEY);
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    console.log('getMatches: Returning stored matches:', parsed);
    return parsed;
  }
  
  console.log('getMatches: No stored data, using default matches');
  // Default matches if none stored - all for today (June 6) with different times
  const defaultMatches: Match[] = [
    {
      id: "1",
      matchDate: "2026-06-06T23:30:00+05:45",
      iframeUrl: "https://securedq.blogspot.com/p/2.html",
      team1img: "/portugal.png",
      team2img: "/chile.png",
      team1name: "Portugal",
      team2name: "Chile",
    },
  ];
  
  console.log('getMatches: Setting default matches:', defaultMatches);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMatches));
  console.log('getMatches: Returning default matches:', defaultMatches);
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
  window.dispatchEvent(new CustomEvent('matchesUpdated'));
  
  return newMatch;
};

export const removeMatch = (id: string): boolean => {
  const matches = getMatches();
  const filteredMatches = matches.filter(match => match.id !== id);
  
  if (filteredMatches.length < matches.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMatches));
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('matchesUpdated'));
    
    return true;
  }
  
  return false;
};

export const updateMatch = (id: string, updates: Partial<Omit<Match, "id">>): boolean => {
  const matches = getMatches();
  const matchIndex = matches.findIndex(match => match.id === id);
  
  if (matchIndex !== -1) {
    matches[matchIndex] = { ...matches[matchIndex], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
    return true;
  }
  
  return false;
};
