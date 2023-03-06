import React, { useState, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Mesh, Intersection } from "three";

export const useRolloverPosition = (
  ref: React.RefObject<any>,
  references: any[]
) => {
  const { raycaster, mouse, camera } = useThree();

  const [rolloverPosition, setRollover] = useState<any>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [intersect, setIntersect] = useState<Intersection | null>(null);

  useEffect(() => {
    // Exit early if references contain an undefined value
    if (references[0] === undefined) {
      return;
    }

    const setRolloverPosition = () => {
      raycaster.setFromCamera(mouse.clone(), camera);

      let intersects = raycaster.intersectObjects(references, true);

      console.log(intersects);
    };

    window.addEventListener("mousemove", setRolloverPosition);
    return () => {
      window.removeEventListener("mousemove", setRolloverPosition);
    };
  });

  return {
    rolloverPosition: rolloverPosition,
  };
};

function MainGround() {
  const mainRef = useRef(null);
  const boxRef = useRef(null);

  const { rolloverPosition } = useRolloverPosition(mainRef, [mainRef.current]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={mainRef}>
        <planeGeometry attach="geometry" args={[10, 10]} />
        <meshBasicMaterial attach="material" />
      </mesh>

      {/* Box */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} ref={boxRef} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
      <gridHelper />
    </>
  );
}

export default MainGround;
