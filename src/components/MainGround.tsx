import { useRef, useEffect, useState, createRef } from "react";
import { useMouseDown } from "../hooks/mouse";
import { useRolloverPosition } from "../hooks/raycaster";

type Block = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  ref: React.RefObject<any>;
};

function MainGround(props: { picker: string }) {
  const mainRef = useRef(null);
  const boxRef = useRef(null);
  const rolloverRef = useRef(null);

  const [blocks, setBlocks] = useState<Block[]>([]);

  const clicked = useMouseDown();

  const references = [
    ...blocks.filter(({ ref }) => ref.current).map(({ ref }) => ref.current),
    mainRef.current,
  ];

  const { rolloverPosition } = useRolloverPosition(rolloverRef, references);

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
          <mesh
            position={[position.x, position.y, position.z]}
            ref={ref}
            key={id}
          >
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
