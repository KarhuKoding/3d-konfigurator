import { useRef, useEffect, useState, createRef } from "react";
import { useSnapshot } from "valtio";

import { state } from "../store/store";
import { useMouseDown } from "../hooks/mouse";
import { useRolloverPosition } from "../hooks/raycaster";
import { Block } from "./Block";
import { RolloverBlock } from "./RolloverBlock";
import { Ground } from "./Ground";
import { eMode, tBlock } from "../types";

// TODO create initBlocks for Testing purposes
// TODO if Mode = Pick, replace rolloverItem with the selected item
const initBlocks: tBlock[] = [
  {
    position: { x: 1, y: 0.5, z: 1 },
    ref: createRef(),
    selected: false,
    blockId: 0,
  },
  {
    position: { x: 2, y: 0.5, z: 0 },
    ref: createRef(),
    selected: false,
    blockId: 1,
  },
];

function Main() {
  const snap = useSnapshot(state);

  const [blocks, setBlocks] = useState<tBlock[]>(initBlocks);

  const mainRef = useRef(null);
  const rolloverRef = useRef(null);
  const clicked = useMouseDown();

  const references = [
    mainRef.current,
    ...blocks
      .filter((block) => block.selected === false)
      .filter(({ ref }) => ref.current)
      .map(({ ref }) => ref.current),
  ];

  const { rolloverPosition } = useRolloverPosition(
    snap.mode === eMode.DRAW
      ? rolloverRef
      : blocks
          .filter((block) => block.selected === true)
          .map(({ ref }) => ref)[0],
    references,
    snap.mode
  );

  useEffect(() => {
    if (clicked && snap.mode === eMode.DRAW) {
      setTimeout(() => {
        const newBlock = {
          position: { ...rolloverPosition },
          ref: createRef(),
          selected: false,
          blockId: blocks.length + 1,
        };

        setBlocks([...blocks, newBlock]);
      }, 50);
    }
    if (clicked && snap.mode === eMode.PICK) {
      // TODO add case for relocate an Item
      console.log("relocate Picked item");
      // const newState = blocks.map((block) => {
      //   return { ...block, selected: false };
      // });
      // setBlocks(newState);
      // state.mode = eMode.DRAW;
    }
  }, [clicked]);

  const handleStateFromBlock = (id: any) => {
    const selectedBlock = blocks.filter((block) => block.selected === true);
    // Only one Block at the time should be selectable
    if (selectedBlock.length === 0) {
      const newState = blocks.map((block) => {
        return block.blockId === id ? { ...block, selected: true } : block;
      });
      setBlocks(newState);
    }
    state.mode = eMode.DRAW;
  };

  return (
    <>
      <Ground ref={mainRef}></Ground>

      {snap.mode === eMode.DRAW && (
        <RolloverBlock ref={rolloverRef}></RolloverBlock>
      )}

      {blocks.map(({ position, ref, blockId, selected }, id) => {
        return (
          <Block
            position={[position.x, position.y, position.z]}
            ref={ref}
            key={id}
            color="blue"
            clickedBlock={handleStateFromBlock}
            blockId={blockId}
          />
        );
      })}
    </>
  );
}

export default Main;
