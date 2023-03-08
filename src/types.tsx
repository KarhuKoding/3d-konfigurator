export type tMode = "DRAW" | "PICK";
export type tElement = "Box" | "BoxL";

export type State = {
  mode: tMode;
  pick: tElement;
};

// ENUMS

export enum eMode {
  DRAW = "DRAW",
  PICK = "PICK",
}
