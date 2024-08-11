"use client";

import { Card, Checkbox, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { PlayerList } from "../player-list/player-list";
import { usePlayers } from "@/hooks/usePlayers";
import { PlayerType } from "@/types/player";

export const AddPlayerCard = () => {
  const { players, addPlayer, removePlayer, isPlayersListLocked } = usePlayers();

  const [value, setValue] = useState("");
  const [isGoalKeeper, setIsGoalKeeper] = useState(false);

  const onSubmitHandler = () => {
    addPlayer({
      id: Date.now().toString(),
      name: value,
      type: isGoalKeeper ? PlayerType.GOALKEEPER : PlayerType.OTHER,
    });
    setValue("");
    setIsGoalKeeper(false);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !!value) {
      onSubmitHandler();
    }
  };

  return (
    <Card size={{ xs: "1", sm: "3" }} className="!flex flex-col gap-y-2 min-w-full sm:min-w-72 md:min-w-96">
      <Flex justify="between">
        <Text color="gray" weight="bold">
          no. {players.length}, {players.filter((player) => player.type === PlayerType.GOALKEEPER).length} goalkeepers
        </Text>
      </Flex>
      {!isPlayersListLocked && (
        <Flex className="gap-x-4">
          <TextField.Root
            size="3"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDownHandler}
          />
          <Flex className="items-center gap-x-2">
            <label className="Label" htmlFor="c1">
              Goalkeeper?
            </label>
            <Checkbox
              id="c1"
              checked={isGoalKeeper}
              onCheckedChange={(checkedState) =>
                setIsGoalKeeper(typeof checkedState === "boolean" ? checkedState : false)
              }
            />
          </Flex>
        </Flex>
      )}
      <PlayerList
        players={players}
        displayMode={isPlayersListLocked ? "locked" : "presentation"}
        onRemovePlayer={removePlayer}
      />
    </Card>
  );
};
