export type tMode = "IDLE" | "DRAW" | "PICKED"; // IDLE => PICKED => DRAW
// TYPES
export type tBlock = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  ref: React.RefObject<any>;
  selected: Boolean;
  blockId: number;
  description: tPick;
};

export type tPick = "CHAIR_1" | "TABLE_1";

// ENUMS

export enum eMode {
  DRAW = "DRAW",
  PICK = "PICKED",
  IDLE = "IDLE",
}

export enum ePick {
  CHAIR_1 = "CHAIR_1",
  TABLE_1 = "TABLE_1",
}
