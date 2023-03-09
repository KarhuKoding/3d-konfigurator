import { ePick, tPick } from "./types";
import { Block } from "./components/Block";
import { RolloverBlock } from "./components/RolloverBlock";

const Test = ({ color = 0xff0000 }) => {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={color} transparent={true} opacity={0.5} />
    </mesh>
  );
};

export const availableBlocks = [
  // eg chair 1
  {
    description: ePick.BOX,
    dimensions: [1, 1, 1],
    component: RolloverBlock, // chair1
  },
  // eg chair 2
  {
    description: ePick.BOX_LARGE,
    dimensions: [1, 2, 1],
    component: Test, // chair2
  },
];

export function getBrickComponent(pick: tPick) {
  return availableBlocks.find((block) => block.description === pick)?.component;
}
// export function getBrickRolloverComponent(pick: tPick) {
//   return availableBlocks.find((block) => block.description === pick)
//     ?.rolloverComponent;
// }

export function getBrickSettings(pick: tPick) {
  return availableBlocks.find((block) => block.description === pick)
    ?.dimensions;
}
