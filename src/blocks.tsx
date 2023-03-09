import { ePick, tPick } from "./types";
import { Block } from "./components/Block";
import { RolloverBlock } from "./components/RolloverBlock";

export const availableBlocks = [
  // eg chair 1
  {
    description: ePick.BOX,
    dimensions: [1, 1, 1],
    rolloverComponent: RolloverBlock, //chair1
    component: Block, // chair1
    geomerty: <boxGeometry args={[1, 1, 1]} />,
  },
  // eg chair 2
  {
    description: ePick.BOX_LARGE,
    dimensions: [1, 2, 1],
    rolloverComponent: RolloverBlock, //chair2
    component: Block, // chair2
    geomerty: <boxGeometry args={[2, 1, 1]} />,
  },
];

export function getActiveBlockComponent(pick: tPick) {
  return availableBlocks.find((block) => block.description === pick)?.component;
}
export function getActiveBrickRolloverComponent(pick: tPick) {
  return availableBlocks.find((block) => block.description === pick)
    ?.rolloverComponent;
}
export function getActiveBrickGeometry(pick: tPick) {
  return availableBlocks.find((block) => block.description === pick)?.geomerty;
}

// export function getBrickSettings(pick: tPick) {
//   return availableBlocks.find((block) => block.description === pick)
//     ?.dimensions;
// }
