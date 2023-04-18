import React, {
  useRef,
  useEffect,
  useState,
  createRef,
  useCallback,
} from "react";
import { useSnapshot } from "valtio";

import { state } from "../store/store";
import { useMouseDown } from "../hooks/mouse";
import { useRolloverPosition } from "../hooks/raycaster";
import { Merged } from "@react-three/drei";
import { Ground } from "./Ground";
import { eMode, ePick, tBlock } from "../types";
import { getActiveBrickGeometry } from "../blocks";
import { useEventListener } from "../hooks/useEventListener";
import { Block } from "../components/Block";
import { RolloverBlock } from "../components/RolloverBlock";
import * as THREE from "three";
import { log } from "console";

const degToRadians = (deg: number) => {
  return (deg * Math.PI) / 180;
};

const initBlocks: tBlock[] = [
  {
    position: { x: 1, y: 0, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    ref: createRef(),
    selected: false,
    blockId: 0,
    description: ePick.CHAIR_1,
  },
  {
    position: { x: 2, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    ref: createRef(),
    selected: false,
    blockId: 1,
    description: ePick.TABLE_1,
  },
];

function Main() {
  const snap = useSnapshot(state);

  const [blocks, setBlocks] = useState<tBlock[]>(initBlocks);
  const [rotation, setRotation] = useState<number>(45);
  const [isDragging, setIsDragging] = useState(false);

  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  const groundRef = useRef(null);
  const rolloverRef = useRef(null);
  const clicked = useMouseDown();

  useEffect(() => {
    state.isDragging = isDragging;
  }, [isDragging]);

  // const { rolloverPosition } = useRolloverPosition(
  //   snap.mode === eMode.DRAW
  //     ? rolloverRef
  //     : blocks
  //         .filter((block) => block.selected === true)
  //         .filter(({ ref }) => ref.current)
  //         .map(({ ref }) => ref)[0],
  //   groundRef,

  //   snap.mode
  // );

  // useEffect(() => {
  //   if (clicked && snap.mode === eMode.DRAW) {
  //     setTimeout(() => {
  //       const newBlock = {
  //         position: { ...rolloverPosition },
  //         ref: createRef(),
  //         selected: false,
  //         blockId: blocks.length + 1,
  //         description: snap.pick,
  //         rotation: { x: 0, y: degToRadians(rotation - 45), z: 0 },
  //       };

  //       setBlocks([...blocks, newBlock]);
  //       setRotation(45);
  //       state.mode = eMode.IDLE;
  //     }, 50);
  //   }
  //   if (clicked && snap.mode === eMode.PICK) {
  //     // TODO add case for relocate an Item
  //     const newState = blocks.map((block) => {
  //       return { ...block, selected: false };
  //     });
  //     setBlocks(newState);
  //   }
  // }, [clicked, snap, state, rotation]);

  // const handler = useCallback(
  //   ({ code }: { code: string }) => {
  //     if (code === "Space" && snap.mode === eMode.DRAW && rolloverRef.current) {
  //       setRotation((prev) => {
  //         if (prev === 360) {
  //           return 45;
  //         }
  //         return prev + 45;
  //       });
  //       // @ts-ignore
  //       rolloverRef.current.rotation.y = degToRadians(rotation);
  //     }

  //     // TODO add case to update the rotation of an Picked Item
  //     return;
  //   },
  //   [snap.mode, rotation, setRotation, rolloverRef]
  // );

  // useEventListener("keydown", handler);

  // const handleStateFromBlock = (id: any) => {
  //   const selectedBlock = blocks.filter((block) => block.selected === true);
  //   // Only one Block at the time should be selectable
  //   if (selectedBlock.length === 0) {
  //     const newState = blocks.map((block) => {
  //       return block.blockId === id ? { ...block, selected: true } : block;
  //     });
  //     setBlocks(newState);
  //   }
  // };

  return (
    <>
      <Ground ref={groundRef}></Ground>
      {/* @ts-ignore */}
      <planeHelper args={[floorPlane, 5, "red"]} />

      {/* <RolloverBlock
        mode={snap.mode}
        ref={rolloverRef}
        geomerty={getActiveBrickGeometry(snap.pick)}
      ></RolloverBlock> */}

      {blocks.map(({ position, rotation, ref, blockId, description }, id) => {
        return (
          // @ts-ignore
          <Block
            position={[position.x, position.y, position.z]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            ref={ref}
            key={id}
            color="blue"
            // clickedBlock={handleStateFromBlock}
            blockId={blockId}
            geometry={getActiveBrickGeometry(description)}
            //@ts-ignore
            setIsDragging={setIsDragging}
            floorPlane={floorPlane}
          />
        );
      })}
    </>
  );
}

export default Main;
