export type tMode = "DRAW" | "PICK";
// TYPES
export type tBlock = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  ref: React.RefObject<any>;
};

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
