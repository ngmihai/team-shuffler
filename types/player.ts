export enum PlayerType {
  GOALKEEPER = "GOALKEEPER",
  OTHER = "OTHER",
}

export type Player = {
  id: string;
  name: string;
  type: PlayerType;
};
