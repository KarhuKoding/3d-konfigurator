import { useRef, useEffect, useState, createRef } from "react";
import { useMouseDown } from "../hooks/mouse";
import { useRolloverPosition } from "../hooks/raycaster";
import { Block } from "./Block";
import { RolloverBlock } from "./RolloverBlock";
import { Ground } from "./Ground";
import { tBlock } from "../types";

function MainGround(props: { picker: string; mode: "Draw" | "Pick" }) {
  const mainRef = useRef(null);
  const rolloverRef = useRef(null);

  const [blocks, setBlocks] = useState<tBlock[]>([]);

  const clicked = useMouseDown();

  const references = [
    ...blocks.filter(({ ref }) => ref.current).map(({ ref }) => ref.current),
    mainRef.current,
  ];

  // TODO refactor Rollover Stuff into own component
  const { rolloverPosition } = useRolloverPosition(
    rolloverRef,
    references,
    props.mode
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
      <RolloverBlock ref={rolloverRef}></RolloverBlock>
      
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

export default MainGround;
