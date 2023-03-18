import { ePick, tPick } from "./types";
import { Block } from "./components/Block";
import { Table } from "./components/building-blocks/Table";
import { Chair } from "./components/building-blocks/Chair";


import ChairPreview from "./assets/chair.png";
import TablePreview from "./assets/table.png";

export const availableBlocks = [
  // Chair 1
  {
    description: ePick.CHAIR_1,
    meta: {
      title: "Chair",
      price: "534,40",
      imgSrc: ChairPreview,
    },
    geomerty: <Chair />,
  },
  // Table 1
  {
    description: ePick.TABLE_1,
    meta: {
      title: "Table",
      price: "650,75",
      imgSrc: TablePreview,
    },
    geomerty: <Table />,
  },
];

export function getActiveBrickGeometry(pick: tPick) {
  return availableBlocks.find((block) => block.description === pick)?.geomerty;
}

// export function getBrickSettings(pick: tPick) {
//   return availableBlocks.find((block) => block.description === pick)
//     ?.dimensions;
// }
