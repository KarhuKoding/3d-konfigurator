import React, { useEffect, useState, createRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "../store/store";
import { eMode } from "../types";

interface Props {
  position: [x: number, y: number, z: number];
  color: string;
  clickedBlock: Function;
  blockId: number;
  geometry: any;
}
type Ref = any;

export const Block = React.forwardRef<Ref, Props>(
  ({ position, color, clickedBlock, blockId, geometry }, ref) => {
    const [x, y, z] = position;
    const [hovered, setHover] = useState<null | Boolean>(null);
    const snap = useSnapshot(state);

    const handeClick = () => {
      if (snap.mode === eMode.PICK) {
        state.mode = eMode.IDLE;
      }
      if (snap.mode === eMode.IDLE) {
        // Set State to PICK
        state.mode = eMode.PICK;
        clickedBlock(blockId);
      }
    };

    const getColor = () => {
      // Only Hightlight Item when not Selected or in Draw Mode
      if (snap.mode === eMode.IDLE) {
        const yellow = "yellow";

        if (hovered) {
          return yellow;
        } else {
          return color;
        }
      }
    };

    return (
      <mesh
        position={[x, y, z]}
        ref={ref}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={handeClick}
      >
        {geometry}
        <meshStandardMaterial color={getColor()} />
      </mesh>
    );
  }
);
