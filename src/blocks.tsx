import { ePick, tPick } from "./types";
import { Block } from "./components/Block";
import { RolloverBlock } from "./components/RolloverBlock";

export const availableBlocks = [
  // eg chair 3
  {
    description: ePick.BOX_SMALL,
    title: "Small Box",
    dimensions: [1, 2, 1],
    rolloverComponent: RolloverBlock, //chair3
    component: Block, // chair3
    geomerty: <boxGeometry args={[0.5, 1, 0.5]} />,
  },
  // eg chair 1
  {
    description: ePick.BOX,
    title: "Box",
    dimensions: [1, 1, 1],
    rolloverComponent: RolloverBlock, //chair1
    component: Block, // chair1
    geomerty: <boxGeometry args={[1, 1, 1]} />,
  },
  // eg chair 2
  {
    description: ePick.BOX_LARGE,
    title: "Big Box",
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
