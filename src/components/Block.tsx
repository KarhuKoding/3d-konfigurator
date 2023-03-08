import React, { useEffect, useState, createRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "../store/store";

interface Props {
  position: [x: number, y: number, z: number];
  color: string;
  clickedBlock: Function;
  blockId: number;
}
type Ref = any;

export const Block = React.forwardRef<Ref, Props>(
  ({ position, color, clickedBlock, blockId }, ref) => {
    const [x, y, z] = position;
    const snap = useSnapshot(state);
    const [hovered, setHover] = useState<null | Boolean>(null);

    const handeClick = () => {
      clickedBlock(blockId);
    };

    const getColor = () => {
      const yellow = "yellow";

      if (hovered) {
        return yellow;
      } else {
        return color;
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
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={getColor()} />
      </mesh>
    );
  }
);
