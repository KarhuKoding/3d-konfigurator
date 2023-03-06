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
    const setRolloverPosition = () => {
      // Exit early if references contain an undefined value
      if (references[0] === undefined) {
        return;
      }

      if (ref.current === null) {
        console.warn("No component set for rollover brick");
        return;
      }

      raycaster.setFromCamera(mouse.clone(), camera);
      let intersects = raycaster.intersectObjects(references, true);

      if (intersects.length > 0) {
        let intersect = intersects[0];
        setIntersect(intersect);

        let rolloverBox = ref.current;
        let [width, height, depth] = [0.5, 0.5, 0.5];

        intersect.point.y = Math.round(Math.abs(intersect.point.y));
        console.log(intersect.point.y);

        rolloverBox.position.copy(intersect.point);

        // https://gamedev.stackexchange.com/questions/33140/how-can-i-snap-a-game-objects-position-to-a-grid=
        rolloverBox.position
          .divide(new THREE.Vector3(width, height, depth))
          .floor()
          .multiply(new THREE.Vector3(width, height, depth))
          .add(new THREE.Vector3(width, height, depth));

        setRollover(rolloverBox.position);
      }
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
  const rolloverRef = useRef(null);

  const { rolloverPosition } = useRolloverPosition(rolloverRef, [
    mainRef.current,
    boxRef.current,
  ]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={mainRef} position={[0, 0, 0]}>
        <planeGeometry attach="geometry" args={[10, 10]} />
        <meshBasicMaterial attach="material" />
      </mesh>
      <gridHelper></gridHelper>

      {/* Box */}
      <mesh ref={boxRef} position={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
      {/* Rollover */}
      <mesh ref={rolloverRef} position={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>
    </>
  );
}

export default MainGround;
