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
const initBlocks: tBlock[] = [
  { position: { x: 1, y: 1, z: 1 }, ref: createRef() },
  { position: { x: 2, y: 1, z: 3 }, ref: createRef() },
];

function Main() {
  const snap = useSnapshot(state);

  const [blocks, setBlocks] = useState<tBlock[]>([...initBlocks]);

  const mainRef = useRef(null);
  const rolloverRef = useRef(null);
  const clicked = useMouseDown();

  const references = [
    ...blocks.filter(({ ref }) => ref.current).map(({ ref }) => ref.current),
    mainRef.current,
  ];
  const { rolloverPosition } = useRolloverPosition(
    rolloverRef,
    references,
    snap.mode
  );

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        const newBlock = {
          position: { ...rolloverPosition },
          ref: createRef(),
        };

        setBlocks([...blocks, newBlock]);
      }, 50);
    }
  }, [clicked]);

  return (
    <>
      <Ground ref={mainRef}></Ground>
      {snap.mode === eMode.DRAW && (
        <RolloverBlock ref={rolloverRef}></RolloverBlock>
      )}

      {blocks.map(({ position, ref }, id) => {
        return (
          <Block
            position={[position.x, position.y, position.z]}
            ref={ref}
            key={id}
          />
        );
      })}
    </>
  );
}

export default Main;
