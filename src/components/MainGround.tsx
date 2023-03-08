import { useRef, useEffect, useState, createRef } from "react";
import { useMouseDown } from "../hooks/mouse";
import { useRolloverPosition } from "../hooks/raycaster";
import { Block } from "./Block";
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={mainRef} position={[0, 0, 0]}>
        <planeGeometry attach="geometry" args={[10, 10]} />
        <meshBasicMaterial attach="material" />
      </mesh>
      <gridHelper></gridHelper>

      <mesh ref={rolloverRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>

      {blocks.map(({ position, ref }, id) => {
        return (
          <Block
            position={[position.x, position.y, position.z]}
            ref={ref}
            key={id}
          />
        );
      })}
      {/* {props.picker === "box" ? (
        <mesh ref={rolloverRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"blue"} />
        </mesh>
      ) : (
        <mesh ref={rolloverRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1, 2]} />
          <meshStandardMaterial color={"cyan"} />
        </mesh>
      )} */}
    </>
  );
}

export default MainGround;
