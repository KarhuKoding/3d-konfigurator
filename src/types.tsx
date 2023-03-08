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

export type tPick = "BOX" | "BOX_LARGE";

export type State = {
  mode: tMode;
  pick: tPick;
};

// ENUMS

export enum eMode {
  DRAW = "DRAW",
  PICK = "PICK",
}

export enum ePick {
  BOX = "BOX",
  BOX_LARGE = "BOX_LARGE",
}
