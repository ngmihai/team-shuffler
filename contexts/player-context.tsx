"use client";

import { Player, PlayerType } from "@/types/player";
import { createContext, useRef, useState } from "react";

type PlayerContextType = {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  shufflePlayers: () => {
    teamOne: Player[];
    teamTwo: Player[];
  };
  isPlayersListLocked: boolean;
  lockPlayersList: () => void;
  unlockPlayersList: () => void;
};

export const PlayerContext = createContext<PlayerContextType | null>(null);

type PlayerContextProviderType = {
  children: React.ReactNode;
};

export const PlayerContextProvider = ({ children }: PlayerContextProviderType) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isPlayersListLocked, setIsPlayersListLocked] = useState(false);

  const playersMetadata = useRef({
    goalkeeperCount: 0,
  });

  const addPlayer = (player: Player) => {
    if (player.type === PlayerType.GOALKEEPER) {
      playersMetadata.current.goalkeeperCount++;
    }

    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const removePlayer = (id: string) => {
    setPlayers((prevPlayers) => prevPlayers.filter((prevPlayer) => prevPlayer.id !== id));
  };

  const shufflePlayers = () => {
    const newShuffledPlayers: Player[] = [...players];

    for (let i = newShuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newShuffledPlayers[i], newShuffledPlayers[j]] = [newShuffledPlayers[j], newShuffledPlayers[i]];
    }

    const half = newShuffledPlayers.length / 2;

    const teamOne = newShuffledPlayers.slice(0, half);
    const teamTwo = newShuffledPlayers.slice(half);

    // Check the distribuiton of goalkeepers
    if (playersMetadata.current.goalkeeperCount > 1) {
      const hasTeamOneGoalkeeper = teamOne.some((player) => player.type === PlayerType.GOALKEEPER);
      const hasTeamTwoGoalkeeper = teamTwo.some((player) => player.type === PlayerType.GOALKEEPER);

      if (!hasTeamOneGoalkeeper || !hasTeamTwoGoalkeeper) {
        return shufflePlayers();
      }
    }

    return { teamOne, teamTwo };
  };

  return (
    <PlayerContext.Provider
      value={{
        players,
        addPlayer,
        removePlayer,
        shufflePlayers,
        isPlayersListLocked,
        lockPlayersList: () => setIsPlayersListLocked(true),
        unlockPlayersList: () => setIsPlayersListLocked(false),
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
