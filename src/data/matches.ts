import type { Match } from "../types/match";

const STORAGE_KEY = "football_matches";

export const getMatches = (): Match[] => {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default matches if none stored
  const defaultMatches: Match[] = [
    {
      id: "1",
      matchDate: "2026-05-30T21:45:00+05:45",
      iframeUrl: "https://ftmesc.blogspot.com/p/4.html",
      team1img: "/psg.png",
      team2img: "/arsenal.png",
      team1name: "PSG",
      team2name: "Arsenal",
    },
  ];
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMatches));
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
