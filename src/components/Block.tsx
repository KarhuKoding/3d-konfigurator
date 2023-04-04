import React, { useEffect, useState, createRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "../store/store";
import { eMode } from "../types";
import { Edges } from "@react-three/drei";
import { useGLTF, useHelper } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { BoxHelper, Object3D } from "three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Falsey } from "utility-types";

interface Props {
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  color: string;
  clickedBlock: Function;
  blockId: number;
  geometry: any;
}
type Ref = any;

type GLTFResult = GLTF & {
  nodes: {
    Office_Desk005: THREE.Mesh;
  };
  materials: {
    OfficeTable: THREE.MeshStandardMaterial;
  };
};

export const Block = React.forwardRef<Ref, Props>(
  (
    { position, rotation, color = "blue", clickedBlock, blockId, geometry },
    ref
  ) => {
    const table = useGLTF("/table.gltf") as GLTFResult;
    const scene = useThree((state) => state.scene);

    const [x, y, z] = position;
    const [rx, ry, rz] = rotation;
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

    // useEffect(() => {
    //   //@ts-ignore
    //   console.log(ref.current.children[0].geometry.uuid);
    // }, []);

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
      <>
        <group
          position={[x, y, z]}
          rotation={[rx, ry, rz]}
          ref={ref}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={handeClick}
        >
          <mesh castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue"></meshStandardMaterial>
          </mesh>
        </group>
      </>
    );
  }
);
