"use client";

import React, { useState } from "react";
import { ActionButtons } from "@/components/action-buttons/action-buttons";
import { AddPlayerCard } from "@/components/player-cards/add-player-card";
import { TeamCard } from "@/components/player-cards/team-card";
import { useMultiStep } from "@/hooks/useMultiStep";
import { Player } from "@/types/player";
import { Grid } from "@radix-ui/themes";

export default function Home() {
  const [teamOnePlayers, setTeamOnePlayers] = useState<Player[] | null>(null);
  const [teamTwoPlayers, setTeamTwoPlayers] = useState<Player[] | null>(null);

  const { activeElement, step, back, isBackDisabled, next } = useMultiStep({
    elements: [
      <AddPlayerCard key="player-card-edit" />,
      <AddPlayerCard key="player-card-locked" />,
      <Grid columns={{ xs: "1", md: "2" }} gap="4" key="player-cards-shuffled">
        {teamOnePlayers && <TeamCard title="Team 1" players={teamOnePlayers} />}
        {teamTwoPlayers && <TeamCard title="Team 2" players={teamTwoPlayers} />}
      </Grid>,
    ],
  });

  return (
    <main className="flex flex-col gap-y-4 justify-center items-center min-h-dvh px-4">
      {activeElement}
      <ActionButtons
        back={back}
        isBackDisabled={isBackDisabled}
        next={next}
        setRandomTeams={(teamOne, teamTwo) => {
          setTeamOnePlayers(teamOne);
          setTeamTwoPlayers(teamTwo);
        }}
        step={step}
      />
    </main>
  );
}
