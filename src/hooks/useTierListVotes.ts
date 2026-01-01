import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'anime-tier-votes';

export interface VoteData {
  [characterKey: string]: number; // characterKey = "animeId-characterId"
}

export const useTierListVotes = () => {
  const [votes, setVotes] = useState<VoteData>({});
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const userVotesStored = localStorage.getItem(`${STORAGE_KEY}-user`);
    
    if (stored) {
      setVotes(JSON.parse(stored));
    }
    if (userVotesStored) {
      setUserVotes(new Set(JSON.parse(userVotesStored)));
    }
  }, []);

  const saveVotes = useCallback((newVotes: VoteData, newUserVotes: Set<string>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVotes));
    localStorage.setItem(`${STORAGE_KEY}-user`, JSON.stringify(Array.from(newUserVotes)));
  }, []);

  const upvote = useCallback((characterKey: string) => {
    if (userVotes.has(characterKey)) return; // Already voted

    const newVotes = {
      ...votes,
      [characterKey]: (votes[characterKey] || 0) + 1,
    };
    const newUserVotes = new Set(userVotes);
    newUserVotes.add(characterKey);

    setVotes(newVotes);
    setUserVotes(newUserVotes);
    saveVotes(newVotes, newUserVotes);
  }, [votes, userVotes, saveVotes]);

  const removeVote = useCallback((characterKey: string) => {
    if (!userVotes.has(characterKey)) return;

    const newVotes = {
      ...votes,
      [characterKey]: Math.max((votes[characterKey] || 0) - 1, 0),
    };
    const newUserVotes = new Set(userVotes);
    newUserVotes.delete(characterKey);

    setVotes(newVotes);
    setUserVotes(newUserVotes);
    saveVotes(newVotes, newUserVotes);
  }, [votes, userVotes, saveVotes]);

  const hasVoted = useCallback((characterKey: string) => {
    return userVotes.has(characterKey);
  }, [userVotes]);

  const getVoteCount = useCallback((characterKey: string) => {
    return votes[characterKey] || 0;
  }, [votes]);

  const getTotalVotes = useCallback(() => {
    return Object.values(votes).reduce((sum, count) => sum + count, 0);
  }, [votes]);

  return {
    votes,
    upvote,
    removeVote,
    hasVoted,
    getVoteCount,
    getTotalVotes,
  };
};
