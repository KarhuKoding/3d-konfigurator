import { useRef, useEffect, useState } from "react";
import { useMouseDown } from "../hooks/mouse";
import { useRolloverPosition } from "../hooks/raycaster";

type Block = {
  position: {
    x: number;
    y: number;
    z: number;
  };
};

function MainGround(props: { picker: string }) {
  const mainRef = useRef(null);
  const boxRef = useRef(null);
  const rolloverRef = useRef(null);

  const [blocks, setBlocks] = useState<Block[]>([]);

  const { rolloverPosition } = useRolloverPosition(rolloverRef, [
    mainRef.current,
    boxRef.current,
  ]);
  const clicked = useMouseDown();

  useEffect(() => {
    if (clicked) {
      const newBlock = {
        position: { ...rolloverPosition },
      };

      setBlocks([...blocks, newBlock]);
      console.log(blocks);
    }
  }, [clicked]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={mainRef} position={[0, 0, 0]}>
        <planeGeometry attach="geometry" args={[10, 10]} />
        <meshBasicMaterial attach="material" />
      </mesh>
      <gridHelper></gridHelper>

      {/* Box */}
      <mesh ref={boxRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>

      <mesh ref={rolloverRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>

      {blocks.map(({ position }) => {
        return (
          <mesh position={[position.x, position.y, position.z]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"blue"} />
          </mesh>
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
