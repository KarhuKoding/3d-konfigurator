import React, { useRef, useEffect, useState, createRef } from "react";
import { useSnapshot } from "valtio";

import { state } from "../store/store";
import { useMouseDown } from "../hooks/mouse";
import { useRolloverPosition } from "../hooks/raycaster";

import { Ground } from "./Ground";
import { eMode, ePick, tBlock } from "../types";
import {
  getActiveBlockComponent,
  getActiveBrickGeometry,
  getActiveBrickRolloverComponent,
} from "../blocks";

//  create initBlocks for Testing purposes

const initBlocks: tBlock[] = [
  {
    position: { x: 1, y: 0.5, z: 1 },
    ref: createRef(),
    selected: false,
    blockId: 0,
    description: ePick.BOX_LARGE,
  },
  {
    position: { x: 2, y: 0.5, z: 0 },
    ref: createRef(),
    selected: false,
    blockId: 1,
    description: ePick.BOX,
  },
  {
    position: { x: 4, y: 0.5, z: 2 },
    ref: createRef(),
    selected: false,
    blockId: 2,
    description: ePick.BOX,
  },
];

function Main() {
  const snap = useSnapshot(state);

  const [blocks, setBlocks] = useState<tBlock[]>(initBlocks);

  const groundRef = useRef(null);
  const rolloverRef = useRef(null);
  const clicked = useMouseDown();

  const RolloverBlock = getActiveBrickRolloverComponent(snap.pick);
  const Block = getActiveBlockComponent(snap.pick);
  const geomerty = getActiveBrickGeometry(snap.pick);

  const { rolloverPosition } = useRolloverPosition(
    snap.mode === eMode.DRAW
      ? rolloverRef
      : blocks
          .filter((block) => block.selected === true)
          .filter(({ ref }) => ref.current)
          .map(({ ref }) => ref)[0],
    groundRef,

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
          description: snap.pick,
        };

        setBlocks([...blocks, newBlock]);
        state.mode = eMode.IDLE;
      }, 50);
    }
    if (clicked && snap.mode === eMode.PICK) {
      // TODO add case for relocate an Item
      const newState = blocks.map((block) => {
        return { ...block, selected: false };
      });
      setBlocks(newState);
    }
  }, [clicked, snap, state]);

  const handleStateFromBlock = (id: any) => {
    const selectedBlock = blocks.filter((block) => block.selected === true);
    // Only one Block at the time should be selectable
    if (selectedBlock.length === 0) {
      const newState = blocks.map((block) => {
        return block.blockId === id ? { ...block, selected: true } : block;
      });
      setBlocks(newState);
    }
  };

  return (
    <>
      <Ground ref={groundRef}></Ground>

      {snap.mode === eMode.DRAW && (
        <React.Suspense fallback={null}>
          {/* @ts-ignore  */}
          <RolloverBlock ref={rolloverRef} geomerty={geomerty}></RolloverBlock>
        </React.Suspense>
      )}
      
      {blocks.map(({ position, ref, blockId, description }, id) => {
        return (
          // @ts-ignore
          <Block
            position={[position.x, position.y, position.z]}
            ref={ref}
            key={id}
            color="blue"
            clickedBlock={handleStateFromBlock}
            blockId={blockId}
            geometry={getActiveBrickGeometry(description)}
          />
        );
      })}
    </>
  );
}

export default Main;
