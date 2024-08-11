import { Card, Strong } from "@radix-ui/themes";
import { PlayerList } from "../player-list/player-list";
import { Player } from "@/types/player";

type TeamCard = {
  players: Player[];
  title: string;
};

export const TeamCard = ({ players, title }: TeamCard) => {
  return (
    <Card size={{ xs: "1", sm: "3" }}>
      <Strong>{title}</Strong>
      <PlayerList players={players} displayMode="presentation" />
    </Card>
  );
};
