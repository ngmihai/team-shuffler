import { PlayerContext } from "@/contexts/player-context";
import { useContext } from "react";

export const usePlayers = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("PlayerContext has to be used inside a PlayerContextProvider.");
  }

  return context;
};
