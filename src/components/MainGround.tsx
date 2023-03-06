import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Intersection } from "three";

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
        let [width, height, depth] = [1, 0.5, 1];

        intersect.point.y = Math.round(Math.abs(intersect.point.y));

        rolloverBox.position.copy(intersect.point);

        // https://gamedev.stackexchange.com/questions/33140/how-can-i-snap-a-game-objects-position-to-a-grid=
        // https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_voxelpainter.html
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

function MainGround(props: { picker: string }) {
  const mainRef = useRef(null);
  const boxRef = useRef(null);
  const rolloverRef = useRef(null);

  const { rolloverPosition } = useRolloverPosition(rolloverRef, [
    mainRef.current,
    boxRef.current,
  ]);

  useEffect(() => {
    console.log("picker", props.picker);
  }, [props.picker]);

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

      {props.picker === "box" ? (
        <mesh ref={rolloverRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"blue"} />
        </mesh>
      ) : (
        <mesh ref={rolloverRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1, 2]} />
          <meshStandardMaterial color={"cyan"} />
        </mesh>
      )}
    </>
  );
}

export default MainGround;
