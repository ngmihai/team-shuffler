import { usePlayers } from "@/hooks/usePlayers";
import { Player } from "@/types/player";
import { Button, Flex } from "@radix-ui/themes";
import { getActionButtonLabel } from "./action-buttons.utils";

type ActionButtonsProps = {
  step: number;
  isBackDisabled: boolean;
  back: () => void;
  next: () => void;
  setRandomTeams: (teamOne: Player[], teamTwo: Player[]) => void;
};

export const ActionButtons = ({ step, isBackDisabled, back, next, setRandomTeams }: ActionButtonsProps) => {
  const { lockPlayersList, unlockPlayersList, shufflePlayers } = usePlayers();

  const randomize = () => {
    const { teamOne, teamTwo } = shufflePlayers();
    setRandomTeams(teamOne, teamTwo);
  };

  return (
    <Flex gap="4" wrap="wrap">
      {!isBackDisabled && (
        <Button
          onClick={() => {
            if (step === 1) {
              unlockPlayersList();
            }
            back();
          }}
        >
          Back
        </Button>
      )}
      <Button
        onClick={() => {
          if (step === 0) {
            lockPlayersList();
          } else {
            randomize();
          }

          if (step < 2) {
            next();
          }
        }}
      >
        {getActionButtonLabel(step)}
      </Button>
    </Flex>
  );
};
