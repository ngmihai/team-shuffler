import { Player, PlayerType } from "@/types/player";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Strong } from "@radix-ui/themes";

type PlayerListProps = {
  players: Player[];
  displayMode: "locked" | "presentation";
  onRemovePlayer?: (id: string) => void;
};

export const PlayerList = ({ players, displayMode, onRemovePlayer }: PlayerListProps) => {
  const showRemoveIcon = displayMode === "locked" && onRemovePlayer;

  return (
    <ul>
      {players.map((player) => (
        <li key={player.id} className="flex items-center gap-x-2">
          {player.type === PlayerType.GOALKEEPER && <Strong>Goalkeeper: </Strong>}
          {player.name}
          {showRemoveIcon && (
            <Cross1Icon onClick={() => onRemovePlayer(player.id)} className="cursor-pointer hover:bg-slate-200" />
          )}
        </li>
      ))}
    </ul>
  );
};
