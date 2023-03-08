import { useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Intersection } from "three";
import { eMode, tMode } from "../types";

type RolloverPosition = {
  x: number;
  y: number;
  z: number;
};

export const useRolloverPosition = (
  ref: React.RefObject<any>,
  references: any[],
  mode: tMode
) => {
  const { raycaster, mouse, camera } = useThree();

  const [rolloverPosition, setRollover] = useState<RolloverPosition>({
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

      // RolloverRef
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
