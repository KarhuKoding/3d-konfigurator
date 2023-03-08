export type tMode = "IDLE" | "DRAW" | "PICKED"; // IDLE => PICKED => DRAW
// TYPES
export type tBlock = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  ref: React.RefObject<any>;
  selected: Boolean;
  blockId: number;
};

export type tPick = "BOX" | "BOX_LARGE";

// ENUMS

export enum eMode {
  DRAW = "DRAW",
  PICK = "PICKED",
  IDLE = "IDLE",
}

export enum ePick {
  BOX = "BOX",
  BOX_LARGE = "BOX_LARGE",
}
